$source = @"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Windows.Forms;
namespace KeyboardSend
{
    public class KeyboardSend
    {
        [DllImport("user32.dll")]
        public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
        private const int KEYEVENTF_EXTENDEDKEY = 1;
        private const int KEYEVENTF_KEYUP = 2;
        public static void KeyDown(Keys vKey)
        {
            keybd_event((byte)vKey, 0, KEYEVENTF_EXTENDEDKEY, 0);
        }
        public static void KeyUp(Keys vKey)
        {
            keybd_event((byte)vKey, 0, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0);
        }
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies "System.Windows.Forms"

Function Win ($Key)
{
    [KeyboardSend.KeyboardSend]::KeyDown("LWin")
    [KeyboardSend.KeyboardSend]::KeyDown("$Key")
    [KeyboardSend.KeyboardSend]::KeyUp("LWin")

}
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
[KeyboardSend.KeyboardSend]::KeyDown("LCtrl")
