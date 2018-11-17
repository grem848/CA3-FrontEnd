$RunDir = "C:\Users\RasmusFriis\Desktop\ca3\Quick Start Demo CRUD V3 zip"
cd $RunDir
Write-Host "currently in"
Write-Host $MyInvocation.MyCommand.Path

Start-Job -Name NPM-start -ScriptBlock {
    npm start
}

Start-Job -Name NPM-dataserver -ScriptBlock {
    #powershell -comand npm run dataserver
    npm run dataserver
}

while($true) {
    start-sleep -s 5
    write-host "still here"
}

#powershell -noexit "& ""C:\my_path\yada_yada\run_import_script.ps1""" (enter)
#powershell -command 