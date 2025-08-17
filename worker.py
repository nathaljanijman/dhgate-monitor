"""
Cloudflare Worker for DHgate Monitor Flask Application
"""

from js import Response, Request, Headers
import asyncio
import json
import os
from urllib.parse import urlparse, parse_qs

# Import our Flask app
from web_interface import app

async def on_fetch(request):
    """Handle incoming requests to the Cloudflare Worker"""
    
    try:
        # Parse the request
        url = str(request.url)
        method = str(request.method)
        parsed_url = urlparse(url)
        path = parsed_url.path
        query_string = parsed_url.query
        
        # Set environment for production
        os.environ['ENVIRONMENT'] = 'production'
        
        # Create a mock WSGI environment
        environ = {
            'REQUEST_METHOD': method,
            'PATH_INFO': path,
            'QUERY_STRING': query_string,
            'CONTENT_TYPE': '',
            'CONTENT_LENGTH': '0',
            'SERVER_NAME': 'dhgate-monitor.com',
            'SERVER_PORT': '443',
            'wsgi.version': (1, 0),
            'wsgi.url_scheme': 'https',
            'wsgi.input': None,
            'wsgi.errors': None,
            'wsgi.multithread': False,
            'wsgi.multiprocess': False,
            'wsgi.run_once': False
        }
        
        # Handle POST data if present
        if method == 'POST':
            if hasattr(request, 'text'):
                body = await request.text()
                environ['wsgi.input'] = body
                environ['CONTENT_LENGTH'] = str(len(body))
            
        # Process request with Flask app
        with app.test_request_context(path, method=method, query_string=query_string):
            try:
                # Get the response from Flask
                flask_response = app.full_dispatch_request()
                
                # Convert Flask response to Cloudflare Worker response
                headers_dict = {}
                for key, value in flask_response.headers:
                    headers_dict[key] = value
                
                # Create Cloudflare Worker response
                response = Response.new(
                    flask_response.get_data(as_text=True),
                    {
                        "status": flask_response.status_code,
                        "headers": headers_dict
                    }
                )
                
                return response
                
            except Exception as e:
                # Return error response
                error_response = {
                    "error": f"Flask application error: {str(e)}",
                    "path": path,
                    "method": method
                }
                
                return Response.new(
                    json.dumps(error_response),
                    {
                        "status": 500,
                        "headers": {"Content-Type": "application/json"}
                    }
                )
                
    except Exception as e:
        # Return worker error response
        error_response = {
            "error": f"Worker error: {str(e)}",
            "url": url if 'url' in locals() else "unknown"
        }
        
        return Response.new(
            json.dumps(error_response),
            {
                "status": 500,
                "headers": {"Content-Type": "application/json"}
            }
        )

# Export the handler for Cloudflare Workers
fetch = on_fetch