@echo preparing build folder
rm -r build
mkdir build

@echo building popup
cd popup
call yarn build
cd ..

@echo copying files
move popup\build build\popup
move build\popup\index.html build\popup.html

xcopy /S assets\* build


@echo done!
pause