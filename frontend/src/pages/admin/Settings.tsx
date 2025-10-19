// import { useState } from "react";
// import { Card } from "../../components/ui/card.tsx";
// import { Button } from "../../components/ui/button.tsx";
// import { Input } from "../../components/ui/input.tsx";
// import { Label } from "../../components/ui/label.tsx";
// import { Textarea } from "../../components/ui/textarea.tsx";
// import { toast } from "sonner";

// export default function SettingsPage() {
//   const [settings, setSettings] = useState({
//     siteName: "KrishiSetu",
//     supportEmail: "support@krishisetu.com",
//     supportPhone: "+91 98765 43210",
//     aboutUs: "KrishiSetu connects farmers directly with consumers, ensuring fair prices and fresh produce.",
//     address: "Bangalore, Karnataka, India",
//   });

//   const handleSave = () => {
//     // TODO: Save to backend
//     toast.success("Settings saved successfully");
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Settings</h1>
//         <p className="text-muted-foreground">Manage application settings and configurations</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">General Settings</h3>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="siteName">Site Name</Label>
//               <Input
//                 id="siteName"
//                 value={settings.siteName}
//                 onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
//               />
//             </div>
//             <div>
//               <Label htmlFor="supportEmail">Support Email</Label>
//               <Input
//                 id="supportEmail"
//                 type="email"
//                 value={settings.supportEmail}
//                 onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
//               />
//             </div>
//             <div>
//               <Label htmlFor="supportPhone">Support Phone</Label>
//               <Input
//                 id="supportPhone"
//                 value={settings.supportPhone}
//                 onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
//               />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">About Us</h3>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="aboutUs">Description</Label>
//               <Textarea
//                 id="aboutUs"
//                 rows={6}
//                 value={settings.aboutUs}
//                 onChange={(e) => setSettings({ ...settings, aboutUs: e.target.value })}
//               />
//             </div>
//             <div>
//               <Label htmlFor="address">Address</Label>
//               <Input
//                 id="address"
//                 value={settings.address}
//                 onChange={(e) => setSettings({ ...settings, address: e.target.value })}
//               />
//             </div>
//           </div>
//         </Card>
//       </div>

//       <Card className="p-6">
//         <h3 className="text-lg font-semibold mb-4">Admin Account</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label>Current Admin Email</Label>
//             <Input value="admin@krishisetu.com" disabled />
//           </div>
//           <div>
//             <Button variant="outline">Change Password</Button>
//           </div>
//         </div>
//       </Card>

//       <div className="flex justify-end gap-4">
//         <Button variant="outline">Reset</Button>
//         <Button onClick={handleSave}>Save Changes</Button>
//       </div>
//     </div>
//   );
// }







// Settings.tsx

// BEFORE (Incorrect):
// import { useState } from "react";
// import { Card } from "../../components/ui/card.tsx";

// AFTER (Correct):
import { useState, useEffect } from "react"; // <--- Add useEffect here
import { Card } from "../../components/ui/card.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Textarea } from "../../components/ui/textarea.tsx";
import { toast } from "sonner";

import { adminAPI } from "../../lib/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    supportEmail: "",
    supportPhone: "",
    aboutUs: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // FIX: This hook now works because useEffect is imported.
  useEffect(() => {
    fetchSettings();
  }, []);

const fetchSettings = async () => {
  try {
    setLoading(true);
    const response = await adminAPI.getSettings();
    const fetchedSettings = response.data.settings || {}; // Ensure it's an object

    // FIX: Use Nullish Coalescing (??) to ensure all required fields are strings
    setSettings({
      siteName: fetchedSettings.siteName ?? '',
      supportEmail: fetchedSettings.supportEmail ?? '',
      supportPhone: fetchedSettings.supportPhone ?? '',
      aboutUs: fetchedSettings.aboutUs ?? '',
      address: fetchedSettings.address ?? '',
      // Add any other setting keys here
    });

  } catch (error) {
    console.error('Error fetching settings:', error);
    toast.error('Failed to load settings');
  } finally {
    setLoading(false);
  }
};

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminAPI.updateSettings(settings);
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    fetchSettings();
    toast.info("Settings reset to saved values");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage application settings and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="supportPhone">Support Phone</Label>
              <Input
                id="supportPhone"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="aboutUs">Description</Label>
              <Textarea
                id="aboutUs"
                rows={6}
                value={settings.aboutUs}
                onChange={(e) => setSettings({ ...settings, aboutUs: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Admin Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Current Admin Email</Label>
            <Input value="admin@krishisetu.com" disabled />
          </div>
          <div>
            <Button variant="outline">Change Password</Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleReset} disabled={saving}>Reset</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}