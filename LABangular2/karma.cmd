@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\.\node_modules\karma\bin\karma" %*
) ELSE (
  node "%~dp0\.\node_modules\karma\bin\karma" %*
)
