#!/usr/bin/env python3
# File: api_fuzzer.py
# Author: @jlucus https://github.com/jlucus
# Date: September 5, 2025
# Version: 2.0.0

import concurrent.futures
import requests
from itertools import product

class APIFuzzer:
    def __init__(self, base_url):
        self.base_url = base_url
        self.endpoints = []
        self.wordlist = self.load_wordlist()
        
    def load_wordlist(self):
        """Load SecLists wordlists"""
        # wget https://github.com/danielmiessler/SecLists/archive/master.zip
        with open('SecLists/Discovery/Web-Content/api-endpoints.txt') as f:
            return f.read().splitlines()
    
    def fuzz_endpoints(self):
        """Discover hidden endpoints"""
        with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
            futures = []
            for word in self.wordlist:
                for method in ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']:
                    futures.append(
                        executor.submit(self.test_endpoint, word, method)
                    )
            
            for future in concurrent.futures.as_completed(futures):
                result = future.result()
                if result:
                    self.endpoints.append(result)
    
    def test_endpoint(self, path, method):
        url = f"{self.base_url}/{path}"
        try:
            r = requests.request(method, url, timeout=3)
            if r.status_code not in [404, 403]:
                return {'method': method, 'url': url, 'status': r.status_code}
        except:
            pass