@echo off
echo Starting schneckyirl Security Tests...
call venv\Scripts\activate.bat
python test_cases\run_all_tests.py %1
pause
