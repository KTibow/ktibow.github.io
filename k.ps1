Add-Type @"
using System;                                                                     
using System.Runtime.InteropServices;
public class Tricks {
[DllImport("user32.dll")]                                                            
public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, int dwExtraInfo);}
"@ 

Add-Type -TypeDefinition $source -ReferencedAssemblies "System.Windows.Forms"
[tricks]::keybd_event([System.Windows.Forms.Keys]::LWin, 0x45, 0, 0);
[tricks]::keybd_event([System.Windows.Forms.Keys]::M, 0x45, 0, 0);
[tricks]::keybd_event([System.Windows.Forms.Keys]::M, 0x45, 0x2, 0);  
[tricks]::keybd_event([System.Windows.Forms.Keys]::LWin, 0x45, 0x2, 0);  
Win "M"
iwr https://i.postimg.cc/wTYWyZ0j/hacked.png -OutFile download-hackd.jpg
mspaint download-hackd.jpg
Sleep 4
[System.Windows.Forms.SendKeys]::SendWait('%F');
sleep .4
[System.Windows.Forms.SendKeys]::SendWait('%B');
Sleep .4
taskkill /F /IM mspaint.exe
start https://ktibow.github.io/google-logout/
echo "You should really lock your computer." > message.txt
notepad message.txt
[tricks]::keybd_event([System.Windows.Forms.Keys]::LControlKey, 0x45, 0, 0);
