#!/usr/bin/env node

/**
 * Manual Customer Journey Test Runner
 * 
 * Usage:
 * npm run test:customer-journey
 * npm run test:customer-journey:production  
 * npm run test:customer-journey:dev
 * 
 * Or directly:
 * node scripts/manual-test.js
 * ENVIRONMENT=production node scripts/manual-test.js
 * TEST_EMAIL=test@example.com VERBOSE=true node scripts/manual-test.js
 */

import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import https from 'https';
import http from 'http';
import { performance } from 'perf_hooks';

const execAsync = promisify(exec);

// Configuration
const config = {
    environment: process.env.ENVIRONMENT || 'development',
    testEmail: process.env.TEST_EMAIL || `manual-test-${Date.now()}@dhgate-monitor.com`,
    verbose: process.env.VERBOSE === 'true' || process.env.VERBOSE === '1',
    timeout: 30000,
    retries: 3
};

// ANSI color codes for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

class ManualTestRunner {
    constructor() {
        this.workerProcess = null;
        this.baseUrl = config.environment === 'production' 
            ? 'https://dhgate-monitor.com' 
            : 'http://localhost:8787';
        this.testResults = {
            timestamp: new Date().toISOString(),
            environment: config.environment,
            testEmail: config.testEmail,
            tests: [],
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                duration: 0
            }
        };
    }

    log(message, color = 'reset') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
    }

    async startWorker() {
        this.log('🚀 Starting Cloudflare Worker...', 'blue');
        
        return new Promise((resolve, reject) => {
            const env = config.environment === 'production' ? 'production' : 'dev';
            const args = config.environment === 'production' 
                ? ['dev', '--remote', '--env', env, '--port', '8787']
                : ['dev', '--env', env, '--port', '8787'];
            
            this.workerProcess = spawn('wrangler', args, {
                stdio: config.verbose ? 'pipe' : 'ignore'
            });

            if (config.verbose) {
                this.workerProcess.stdout.on('data', (data) => {
                    console.log(`${colors.cyan}[Worker] ${data.toString().trim()}${colors.reset}`);
                });
                
                this.workerProcess.stderr.on('data', (data) => {
                    console.log(`${colors.yellow}[Worker Error] ${data.toString().trim()}${colors.reset}`);
                });
            }

            // Wait for worker to be ready
            setTimeout(() => {
                this.log('✅ Worker should be ready', 'green');
                resolve();
            }, 8000);

            this.workerProcess.on('error', (error) => {
                this.log(`❌ Worker error: ${error.message}`, 'red');
                reject(error);
            });
        });
    }

    async stopWorker() {
        if (this.workerProcess) {
            this.log('🛑 Stopping Worker...', 'yellow');
            this.workerProcess.kill('SIGTERM');
            
            // Force kill after 5 seconds
            setTimeout(() => {
                if (this.workerProcess && !this.workerProcess.killed) {
                    this.workerProcess.kill('SIGKILL');
                }
            }, 5000);
        }
    }

    async makeRequest(path, options = {}) {
        const url = `${this.baseUrl}${path}`;
        const requestLib = url.startsWith('https') ? https : http;
        
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'DHgate-Monitor-Manual-Test/1.0',
                    ...options.headers
                }
            };

            const req = requestLib.request(url, requestOptions, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const result = {
                            statusCode: res.statusCode,
                            headers: res.headers,
                            body: data
                        };
                        
                        if (res.headers['content-type']?.includes('application/json')) {
                            result.json = JSON.parse(data);
                        }
                        
                        resolve(result);
                    } catch (error) {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            body: data,
                            parseError: error.message
                        });
                    }
                });
            });

            req.on('error', reject);
            req.setTimeout(config.timeout, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            if (options.body) {
                req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
            }
            
            req.end();
        });
    }

    async runTest(testName, testFunction) {
        const startTime = performance.now();
        this.log(`🧪 Running: ${testName}`, 'cyan');
        
        try {
            const result = await testFunction();
            const duration = Math.round(performance.now() - startTime);
            
            this.testResults.tests.push({
                name: testName,
                status: 'PASSED',
                duration,
                result
            });
            
            this.testResults.summary.passed++;
            this.log(`✅ PASSED: ${testName} (${duration}ms)`, 'green');
            
            if (config.verbose && result) {
                console.log(`${colors.blue}   Result: ${JSON.stringify(result, null, 2)}${colors.reset}`);
            }
            
            return true;
        } catch (error) {
            const duration = Math.round(performance.now() - startTime);
            
            this.testResults.tests.push({
                name: testName,
                status: 'FAILED',
                duration,
                error: error.message,
                stack: error.stack
            });
            
            this.testResults.summary.failed++;
            this.log(`❌ FAILED: ${testName} (${duration}ms)`, 'red');
            this.log(`   Error: ${error.message}`, 'red');
            
            if (config.verbose) {
                console.log(`${colors.red}   Stack: ${error.stack}${colors.reset}`);
            }
            
            return false;
        } finally {
            this.testResults.summary.total++;
        }
    }

    async runCustomerJourneyTests() {
        const overallStartTime = performance.now();
        
        this.log('🎯 Starting Comprehensive Customer Journey Tests', 'bold');
        this.log(`   Environment: ${config.environment}`, 'blue');
        this.log(`   Base URL: ${this.baseUrl}`, 'blue');
        this.log(`   Test Email: ${config.testEmail}`, 'blue');
        this.log('', 'reset');

        // Test 1: Health Check
        await this.runTest('Health Check', async () => {
            const response = await this.makeRequest('/health');
            if (response.statusCode !== 200) {
                throw new Error(`Health check failed: ${response.statusCode}`);
            }
            return { status: response.statusCode, healthy: true };
        });

        // Test 2: Homepage Load
        await this.runTest('Homepage Load', async () => {
            const response = await this.makeRequest('/');
            if (response.statusCode !== 200) {
                throw new Error(`Homepage load failed: ${response.statusCode}`);
            }
            return { status: response.statusCode, hasContent: response.body.length > 0 };
        });

        // Test 3: Widget API Endpoint
        await this.runTest('Widget API Endpoint', async () => {
            const response = await this.makeRequest('/api/widget');
            if (response.statusCode !== 200) {
                throw new Error(`Widget API failed: ${response.statusCode}`);
            }
            return { status: response.statusCode, hasWidget: response.body.includes('signup-widget') };
        });

        // Test 4: User Signup
        let signupResult = null;
        await this.runTest('User Signup Flow', async () => {
            const signupData = {
                email: config.testEmail,
                storeType: 'dropshipping',
                monthlyRevenue: '1000-5000'
            };

            const response = await this.makeRequest('/signup', {
                method: 'POST',
                body: signupData
            });

            if (response.statusCode !== 200) {
                throw new Error(`Signup failed: ${response.statusCode} - ${response.body}`);
            }

            if (response.json) {
                signupResult = response.json;
                if (!signupResult.dashboardToken && !signupResult.token) {
                    throw new Error('No dashboard token received');
                }
                return {
                    status: response.statusCode,
                    hasToken: !!(signupResult.dashboardToken || signupResult.token),
                    email: signupResult.email
                };
            }
            
            throw new Error('Invalid signup response format');
        });

        // Test 5: Dashboard Access
        if (signupResult && (signupResult.dashboardToken || signupResult.token)) {
            await this.runTest('Dashboard Access', async () => {
                const token = signupResult.dashboardToken || signupResult.token;
                const response = await this.makeRequest(`/dashboard?token=${token}`);
                
                if (response.statusCode !== 200) {
                    throw new Error(`Dashboard access failed: ${response.statusCode}`);
                }
                
                return {
                    status: response.statusCode,
                    hasDashboard: response.body.includes('dashboard'),
                    hasUserData: response.body.includes(config.testEmail)
                };
            });
        }

        // Test 6: API Security Test
        await this.runTest('API Security - XSS Protection', async () => {
            const maliciousData = {
                email: '<script>alert("xss")</script>@test.com',
                storeType: '<script>alert("xss")</script>',
                monthlyRevenue: '<script>alert("xss")</script>'
            };

            const response = await this.makeRequest('/signup', {
                method: 'POST',
                body: maliciousData
            });

            // Should either reject the malicious input or sanitize it
            const bodyLower = response.body.toLowerCase();
            if (bodyLower.includes('<script>') || bodyLower.includes('alert(')) {
                throw new Error('XSS vulnerability detected - script tags not sanitized');
            }

            return {
                status: response.statusCode,
                xssProtected: true,
                sanitized: !bodyLower.includes('<script>')
            };
        });

        // Test 7: Form Validation
        await this.runTest('Form Validation', async () => {
            const invalidData = {
                email: 'invalid-email',
                storeType: '',
                monthlyRevenue: ''
            };

            const response = await this.makeRequest('/signup', {
                method: 'POST',
                body: invalidData
            });

            // Should return validation error
            if (response.statusCode === 200 && response.json && response.json.success) {
                throw new Error('Invalid data was accepted');
            }

            return {
                status: response.statusCode,
                validationWorking: true,
                rejected: response.statusCode !== 200 || !response.json?.success
            };
        });

        // Test 8: Performance Test
        await this.runTest('Performance Test', async () => {
            const startTime = performance.now();
            const response = await this.makeRequest('/');
            const endTime = performance.now();
            const responseTime = endTime - startTime;

            if (responseTime > 5000) {
                throw new Error(`Response time too slow: ${responseTime}ms`);
            }

            return {
                responseTime: Math.round(responseTime),
                acceptable: responseTime <= 5000,
                fast: responseTime <= 1000
            };
        });

        // Calculate overall duration
        this.testResults.summary.duration = Math.round(performance.now() - overallStartTime);
        
        return this.testResults;
    }

    async saveResults() {
        const fs = await import('fs/promises');
        const resultsFile = `test-results-${config.environment}-${Date.now()}.json`;
        
        try {
            await fs.writeFile(resultsFile, JSON.stringify(this.testResults, null, 2));
            this.log(`📁 Test results saved to: ${resultsFile}`, 'blue');
        } catch (error) {
            this.log(`⚠️  Could not save test results: ${error.message}`, 'yellow');
        }
    }

    printSummary() {
        const { summary } = this.testResults;
        
        this.log('', 'reset');
        this.log('📊 TEST SUMMARY', 'bold');
        this.log('='.repeat(50), 'blue');
        this.log(`Total Tests: ${summary.total}`, 'blue');
        this.log(`Passed: ${summary.passed}`, 'green');
        this.log(`Failed: ${summary.failed}`, summary.failed > 0 ? 'red' : 'green');
        this.log(`Duration: ${summary.duration}ms`, 'blue');
        this.log(`Success Rate: ${Math.round((summary.passed / summary.total) * 100)}%`, 
                 summary.failed === 0 ? 'green' : 'yellow');
        this.log('='.repeat(50), 'blue');
        
        if (summary.failed === 0) {
            this.log('🎉 All tests passed!', 'green');
        } else {
            this.log(`⚠️  ${summary.failed} test(s) failed`, 'red');
        }
    }

    async run() {
        try {
            // Only start worker if not in production
            if (config.environment !== 'production') {
                await this.startWorker();
            }

            // Wait a bit more for worker to fully initialize
            if (config.environment !== 'production') {
                this.log('⏳ Waiting for worker initialization...', 'yellow');
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            // Run the tests
            await this.runCustomerJourneyTests();

            // Save results
            await this.saveResults();

            // Print summary
            this.printSummary();

            // Exit with appropriate code
            process.exit(this.testResults.summary.failed === 0 ? 0 : 1);
            
        } catch (error) {
            this.log(`💥 Fatal error: ${error.message}`, 'red');
            console.error(error);
            process.exit(1);
        } finally {
            await this.stopWorker();
        }
    }
}

// Handle process signals
process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    process.exit(130);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(143);
});

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const runner = new ManualTestRunner();
    runner.run().catch(console.error);
}

export default ManualTestRunner;