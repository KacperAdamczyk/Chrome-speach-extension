@echo preparing build folder
rmdir /S /Q build
mkdir build

@echo building popup
cd popup
call yarn build
cd ..

@echo copying files
move popup\build build\popup
move build\popup\index.html build\popup.html

xcopy /S assets\* build
mkdir build\background
xcopy /s background\* build\background

@echo done!
pause