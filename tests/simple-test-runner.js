#!/usr/bin/env node

/**
 * Simple Test Runner for DHgate Monitor QA
 * Shows test results in an easy-to-read format
 */

import { spawn } from 'child_process';
import { createWriteStream } from 'fs';
import fs from 'fs/promises';

async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch {
    return false;
  }
}

async function runTest(testName, testFile) {
  return new Promise((resolve) => {
    console.log(`🧪 Testing: ${testName}`);
    
    const args = [
      'playwright', 'test', testFile,
      '--reporter=line',
      '--output-dir=test-results'
    ];
    
    const testProcess = spawn('npx', args, {
      stdio: 'pipe'
    });

    let output = '';
    let hasResults = false;

    testProcess.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      if (text.includes('✓') || text.includes('×') || text.includes('passed') || text.includes('failed')) {
        hasResults = true;
        console.log(`   ${text.trim()}`);
      }
    });

    testProcess.stderr.on('data', (data) => {
      const text = data.toString();
      if (!text.includes('Warning') && !text.includes('DevTools')) {
        console.log(`   ⚠️  ${text.trim()}`);
      }
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`   ✅ ${testName} - Tests passed`);
      } else {
        console.log(`   ❌ ${testName} - Some tests failed`);
      }
      
      resolve({
        name: testName,
        success: code === 0,
        output: output
      });
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      testProcess.kill();
      console.log(`   ⏱️  ${testName} - Timed out`);
      resolve({
        name: testName,
        success: false,
        output: 'Test timed out'
      });
    }, 30000);
  });
}

async function main() {
  console.log('🧪 DHgate Monitor - Simple QA Test Runner');
  console.log('==========================================');
  console.log(`📅 ${new Date().toLocaleString('nl-NL')}`);
  console.log('');

  // Check if server is running
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('⚠️  Development server is not running at http://localhost:3000');
    console.log('');
    console.log('📋 To run tests:');
    console.log('   1. Start server: npm run dev');
    console.log('   2. In another terminal: npm run test:qa');
    console.log('');
    return;
  }

  console.log('✅ Development server is running');
  console.log('🚀 Starting tests...');
  console.log('');

  const tests = [
    {
      name: '🏠 Landing Page',
      file: 'tests/e2e/core/landingPage.test.js'
    },
    {
      name: '🔐 Dashboard Access',  
      file: 'tests/e2e/core/dashboardAccess.test.js'
    },
    {
      name: '♿ Accessibility',
      file: 'tests/e2e/compliance/accessibility.test.js'
    }
  ];

  const results = [];
  
  for (const test of tests) {
    try {
      // Check if test file exists
      await fs.access(test.file);
      const result = await runTest(test.name, test.file);
      results.push(result);
    } catch (error) {
      console.log(`   ⏭️  ${test.name} - Skipped (file not found)`);
      results.push({
        name: test.name,
        success: false,
        skipped: true
      });
    }
    console.log('');
  }

  // Summary
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success && !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;

  console.log('📊 SUMMARY');
  console.log('='.repeat(20));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log('');

  if (failed > 0) {
    console.log('❌ Some tests failed. Check the output above for details.');
  } else if (passed > 0) {
    console.log('🎉 All available tests passed!');
  }

  console.log('');
  console.log('📁 Results saved in: test-results/');
  console.log('💡 For detailed HTML reports, run: npm run test:e2e:ui');
}

main().catch(console.error);