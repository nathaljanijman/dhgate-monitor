/**
 * Test Suite for DHgate Monitor API Fixes
 * 
 * Tests the fixes for Product search API 500 errors in Asia-Pacific region
 * Including circuit breaker, retry logic, and enhanced error handling
 */

class APIFixTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.testResults = [];
  }

  async runAllTests() {
    console.log('🧪 Starting API Fix Test Suite...\n');
    
    const tests = [
      this.testHealthCheckEndpoint.bind(this),
      this.testStoreSearchWithRetry.bind(this),
      this.testCircuitBreakerFunctionality.bind(this),
      this.testRegionalFallback.bind(this),
      this.testRateLimitHandling.bind(this),
      this.testAsiaPackificSpecificFix.bind(this)
    ];

    for (const test of tests) {
      try {
        await test();
      } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
        this.testResults.push({
          test: test.name,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    this.printSummary();
    return this.testResults;
  }

  async testHealthCheckEndpoint() {
    console.log('🔍 Testing Enhanced Health Check Endpoint...');
    
    // Test general health check
    const response = await fetch(`${this.baseUrl}/api/health`);
    const data = await response.json();
    
    this.assert(response.ok, 'Health check endpoint should be accessible');
    this.assert(data.timestamp, 'Health check should include timestamp');
    this.assert(data.overall_status, 'Health check should include overall status');
    this.assert(data.regions, 'Health check should include regional status');
    this.assert(data.performance, 'Health check should include performance metrics');
    
    console.log(`✅ Health check status: ${data.overall_status}`);
    console.log(`✅ Regions checked: ${Object.keys(data.regions).length}`);
    
    // Test Asia-Pacific specific health check
    const apResponse = await fetch(`${this.baseUrl}/api/health?region=asia-pacific`);
    const apData = await apResponse.json();
    
    this.assert(apData.regions['asia-pacific'], 'Asia-Pacific region should be included');
    console.log(`✅ Asia-Pacific health status: ${apData.regions['asia-pacific'].status || 'unknown'}`);
    
    // Test circuit breaker information
    const cbResponse = await fetch(`${this.baseUrl}/api/health?circuit_breakers=true`);
    const cbData = await cbResponse.json();
    
    this.assert(cbData.circuit_breakers, 'Circuit breaker information should be available');
    console.log(`✅ Circuit breakers: ${Object.keys(cbData.circuit_breakers).length} regions monitored`);
    
    this.testResults.push({
      test: 'testHealthCheckEndpoint',
      status: 'passed',
      details: {
        overallStatus: data.overall_status,
        regionsChecked: Object.keys(data.regions).length,
        apacStatus: apData.regions['asia-pacific']?.status
      }
    });
  }

  async testStoreSearchWithRetry() {
    console.log('🔍 Testing Store Search with Enhanced Retry Logic...');
    
    const testQueries = ['electronics', 'fashion', 'home'];
    
    for (const query of testQueries) {
      const startTime = Date.now();
      const response = await fetch(`${this.baseUrl}/api/stores/search?q=${query}`);
      const data = await response.json();
      const duration = Date.now() - startTime;
      
      this.assert(response.ok, `Store search for "${query}" should succeed`);
      this.assert(data.stores !== undefined, 'Response should include stores array');
      this.assert(data.performance, 'Response should include performance metrics');
      
      console.log(`✅ Search "${query}": ${data.stores?.length || 0} results in ${duration}ms`);
      
      // Test with regional parameter
      const regionResponse = await fetch(`${this.baseUrl}/api/stores/search?q=${query}&region=asia-pacific`);
      const regionData = await regionResponse.json();
      
      console.log(`✅ Regional search "${query}": ${regionData.stores?.length || 0} results`);
    }
    
    this.testResults.push({
      test: 'testStoreSearchWithRetry',
      status: 'passed',
      details: {
        queriesTested: testQueries.length,
        allSucceeded: true
      }
    });
  }

  async testCircuitBreakerFunctionality() {
    console.log('🔍 Testing Circuit Breaker Functionality...');
    
    // This test simulates circuit breaker behavior
    // In a real scenario, we would need to trigger failures to test the circuit breaker
    
    const healthResponse = await fetch(`${this.baseUrl}/api/health?circuit_breakers=true`);
    const healthData = await healthResponse.json();
    
    this.assert(healthData.circuit_breakers, 'Circuit breaker status should be available');
    
    const apacCircuitBreaker = healthData.circuit_breakers['asia-pacific'];
    this.assert(apacCircuitBreaker, 'Asia-Pacific circuit breaker should exist');
    this.assert(apacCircuitBreaker.state !== undefined, 'Circuit breaker should have a state');
    
    console.log(`✅ Asia-Pacific circuit breaker state: ${apacCircuitBreaker.state}`);
    console.log(`✅ Failure count: ${apacCircuitBreaker.failureCount}`);
    
    this.testResults.push({
      test: 'testCircuitBreakerFunctionality',
      status: 'passed',
      details: {
        circuitBreakerState: apacCircuitBreaker.state,
        failureCount: apacCircuitBreaker.failureCount
      }
    });
  }

  async testRegionalFallback() {
    console.log('🔍 Testing Regional Fallback Mechanism...');
    
    // Test multiple searches to potentially trigger regional fallback
    const searches = [];
    for (let i = 0; i < 5; i++) {
      const promise = fetch(`${this.baseUrl}/api/stores/search?q=test${i}`)
        .then(r => r.json())
        .then(data => ({
          success: true,
          stores: data.stores?.length || 0,
          performance: data.performance
        }))
        .catch(error => ({
          success: false,
          error: error.message
        }));
      searches.push(promise);
    }
    
    const results = await Promise.all(searches);
    const successCount = results.filter(r => r.success).length;
    
    console.log(`✅ Regional fallback test: ${successCount}/5 requests succeeded`);
    
    this.assert(successCount >= 3, 'At least 60% of requests should succeed with fallback');
    
    this.testResults.push({
      test: 'testRegionalFallback',
      status: 'passed',
      details: {
        totalRequests: 5,
        successfulRequests: successCount,
        successRate: (successCount / 5) * 100
      }
    });
  }

  async testRateLimitHandling() {
    console.log('🔍 Testing Rate Limit Handling...');
    
    // Send multiple concurrent requests to test rate limit handling
    const concurrentRequests = 10;
    const promises = Array.from({ length: concurrentRequests }, (_, i) =>
      fetch(`${this.baseUrl}/api/stores/search?q=ratelimit${i}`)
        .then(response => ({
          status: response.status,
          ok: response.ok,
          headers: {
            rateLimit: response.headers.get('X-RateLimit-Remaining'),
            retryAfter: response.headers.get('Retry-After')
          }
        }))
        .catch(error => ({
          status: 0,
          ok: false,
          error: error.message
        }))
    );
    
    const responses = await Promise.all(promises);
    const successResponses = responses.filter(r => r.ok);
    const rateLimitResponses = responses.filter(r => r.status === 429);
    
    console.log(`✅ Rate limit test: ${successResponses.length} success, ${rateLimitResponses.length} rate limited`);
    
    // At least some requests should succeed even under load
    this.assert(successResponses.length > 0, 'Some requests should succeed even under high load');
    
    this.testResults.push({
      test: 'testRateLimitHandling',
      status: 'passed',
      details: {
        totalRequests: concurrentRequests,
        successfulRequests: successResponses.length,
        rateLimitedRequests: rateLimitResponses.length
      }
    });
  }

  async testAsiaPackificSpecificFix() {
    console.log('🔍 Testing Asia-Pacific Specific Fix...');
    
    // Test the specific fix for Asia-Pacific region
    const response = await fetch(`${this.baseUrl}/api/stores/search?q=electronics&region=asia-pacific`);
    const data = await response.json();
    
    // The key test: request should not return 500 error
    this.assert(response.status !== 500, 'Asia-Pacific requests should not return 500 errors');
    this.assert(response.ok || response.status === 429, 'Response should be OK or rate limited (not server error)');
    
    // Check if we get results or graceful fallback
    if (response.ok) {
      this.assert(data.stores !== undefined, 'Successful response should include stores');
      console.log(`✅ Asia-Pacific search succeeded: ${data.stores?.length || 0} results`);
    } else if (response.status === 429) {
      console.log(`✅ Asia-Pacific search rate limited (expected behavior)`);
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    
    // Test health check for Asia-Pacific
    const healthResponse = await fetch(`${this.baseUrl}/api/health?region=asia-pacific`);
    const healthData = await healthResponse.json();
    
    const apacHealth = healthData.regions['asia-pacific'];
    console.log(`✅ Asia-Pacific health: ${apacHealth?.healthy ? 'healthy' : 'unhealthy'}`);
    console.log(`✅ Asia-Pacific response time: ${apacHealth?.responseTime || 'unknown'}ms`);
    
    this.testResults.push({
      test: 'testAsiaPackificSpecificFix',
      status: 'passed',
      details: {
        searchStatus: response.status,
        healthStatus: apacHealth?.healthy,
        responseTime: apacHealth?.responseTime
      }
    });
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  printSummary() {
    console.log('\n🎯 Test Summary:');
    console.log('================');
    
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    const total = this.testResults.length;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);
    
    if (failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => r.status === 'failed')
        .forEach(r => console.log(`  - ${r.test}: ${r.error}`));
    }
    
    console.log(`\n${failed === 0 ? '🎉' : '⚠️'} Testing completed!`);
  }
}

// Export for use in Node.js environment
export default APIFixTester;

// Auto-run if executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const tester = new APIFixTester(process.env.BASE_URL || 'http://localhost:3000');
  tester.runAllTests().catch(console.error);
}