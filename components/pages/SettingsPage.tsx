'use client';


import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Lock, 
  Bell, 
  Shield, 
  User, 
  CreditCard,
  LogOut,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'

export function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    privateAccount: false,
    newsNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    communityNotifications: true,
    messageNotifications: true,
    twoFactorAuth: false
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChangePassword = () => {
    alert('Password change functionality coming soon!')
  }

  const handleChangePIN = () => {
    alert('PIN change functionality coming soon!')
  }

  const handleDeactivateAccount = () => {
    if (confirm('Are you sure you want to deactivate your account?')) {
      alert('Account deactivation functionality coming soon!')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      alert('Account deletion functionality coming soon!')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:flex">
          <TabsTrigger value="privacy">
            <Shield className="w-4 h-4 mr-2 hidden sm:inline" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2 hidden sm:inline" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2 hidden sm:inline" />
            Security
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2 hidden sm:inline" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy and Security</CardTitle>
              <CardDescription>
                We care about your privacy and want to give you more ways to control who you share with in your community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="private-account">Private Account</Label>
                  <p className="text-sm text-muted-foreground">
                    When your account is private, only people you approve can see your photos and videos
                  </p>
                </div>
                <Switch
                  id="private-account"
                  checked={settings.privateAccount}
                  onCheckedChange={() => toggleSetting('privateAccount')}
                />
              </div>

              <div className="space-y-3">
                <Label>Choose Default Audience</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Public - Anyone on or across all communities in your country
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Friends - Your friends within your communities
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Community except - Don&apos;t show to some
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Blocked Accounts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage what notifications you want to see</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="news-feed">News Feed</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about posts and updates in your feed
                  </p>
                </div>
                <Switch
                  id="news-feed"
                  checked={settings.newsNotifications}
                  onCheckedChange={() => toggleSetting('newsNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => toggleSetting('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notif">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  id="sms-notif"
                  checked={settings.smsNotifications}
                  onCheckedChange={() => toggleSetting('smsNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="community-notif">Community Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about community events and posts
                  </p>
                </div>
                <Switch
                  id="community-notif"
                  checked={settings.communityNotifications}
                  onCheckedChange={() => toggleSetting('communityNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-notif">Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive new messages
                  </p>
                </div>
                <Switch
                  id="message-notif"
                  checked={settings.messageNotifications}
                  onCheckedChange={() => toggleSetting('messageNotifications')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Change Password</Label>
                  <div className="flex gap-2 mt-2">
                    <div className="relative flex-1">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Current password"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm password" />
                  </div>
                  <Button className="mt-2" onClick={handleChangePassword}>
                    Update Password
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Label>Change PIN</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Change your transaction PIN
                  </p>
                  <Button variant="outline" onClick={handleChangePIN}>
                    Change PIN
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      id="2fa"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={() => toggleSetting('twoFactorAuth')}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label>Security Questions</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Set security questions for account recovery
                  </p>
                  <Button variant="outline">
                    Set Security Questions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Wallet & Balance</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Manage your wallet and view transaction history
                </p>
                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  View Wallet
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Label>Business Account</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Create a business account to access business features
                </p>
                <Button variant="outline">
                  Create Business Account
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Label>Referral Program</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Earn rewards by referring friends
                </p>
                <Button variant="outline">
                  Refer a Friend
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-destructive">Deactivate Account</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Temporarily deactivate your account. You can restore it within 30 days
                </p>
                <Button variant="outline" className="text-destructive" onClick={handleDeactivateAccount}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Deactivate Account
                </Button>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Permanently delete your account. This action cannot be undone
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}