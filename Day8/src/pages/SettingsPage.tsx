import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Bell, Palette, Monitor, Shield, Download, Upload,
  Save, Eye, EyeOff
} from 'lucide-react'
import { cn } from '../lib/utils'
import { useAuthStore } from '../store/useStore'

interface SettingsTab {
  id: string
  label: string
  icon: any
}

const SettingsPage = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const tabs: SettingsTab[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Monitor }
  ]

  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student passionate about web development and AI.',
    location: 'New York, NY',
    website: 'https://johndoe.dev'
  })

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginNotifications: true
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    gradeUpdates: true,
    courseAnnouncements: true,
    systemUpdates: false
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark',
    accentColor: 'purple',
    fontSize: 'medium',
    compactMode: false,
    animations: true
  })

  const handleSave = () => {
    // Save logic here
    setUnsavedChanges(false)
    console.log('Settings saved!')
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="heading-lg gradient-text">Settings</h1>
          <p className="text-gray-300 mt-2">Manage your account preferences</p>
        </div>
        
        {unsavedChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setUnsavedChanges(false)}
              className="px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-glow px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass rounded-2xl p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <button 
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                        title="Upload profile picture"
                        aria-label="Upload profile picture"
                      >
                        <Upload className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Profile Picture</h3>
                      <p className="text-gray-400 text-sm">Upload a new profile picture</p>
                      <div className="flex gap-2 mt-2">
                        <button className="text-purple-400 text-sm hover:text-purple-300">Change</button>
                        <button className="text-red-400 text-sm hover:text-red-300">Remove</button>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={profileData.name}
                        onChange={(e) => {
                          setProfileData({...profileData, name: e.target.value})
                          setUnsavedChanges(true)
                        }}
                        placeholder="Enter your full name"
                        title="Enter your full name"
                        className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => {
                          setProfileData({...profileData, email: e.target.value})
                          setUnsavedChanges(true)
                        }}
                        placeholder="Enter your email address"
                        title="Enter your email address"
                        className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => {
                          setProfileData({...profileData, phone: e.target.value})
                          setUnsavedChanges(true)
                        }}
                        placeholder="Enter your phone number"
                        title="Enter your phone number"
                        className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                      <input
                        id="location"
                        type="text"
                        value={profileData.location}
                        onChange={(e) => {
                          setProfileData({...profileData, location: e.target.value})
                          setUnsavedChanges(true)
                        }}
                        placeholder="Enter your location"
                        title="Enter your location"
                        className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => {
                        setProfileData({...profileData, bio: e.target.value})
                        setUnsavedChanges(true)
                      }}
                      rows={4}
                      placeholder="Tell us about yourself"
                      title="Enter a brief bio about yourself"
                      className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Security & Privacy</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={securitySettings.currentPassword}
                          onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Enter current password"
                          title="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          title={showPassword ? "Hide password" : "Show password"}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="newPassword" className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                        <input
                          id="newPassword"
                          type="password"
                          value={securitySettings.newPassword}
                          onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Enter new password"
                          title="Enter a new password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={securitySettings.confirmPassword}
                          onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Confirm new password"
                          title="Confirm your new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="twoFactorAuth"
                          type="checkbox"
                          checked={securitySettings.twoFactorEnabled}
                          onChange={(e) => setSecuritySettings({...securitySettings, twoFactorEnabled: e.target.checked})}
                          className="sr-only peer"
                          title="Enable two-factor authentication"
                          aria-label="Enable two-factor authentication"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Login Notifications</h3>
                        <p className="text-gray-400 text-sm">Get notified when someone signs in to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="loginNotifications"
                          type="checkbox"
                          checked={securitySettings.loginNotifications}
                          onChange={(e) => setSecuritySettings({...securitySettings, loginNotifications: e.target.checked})}
                          className="sr-only peer"
                          title="Enable login notifications"
                          aria-label="Enable login notifications"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                      { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via text message' },
                      { key: 'assignmentReminders', label: 'Assignment Reminders', desc: 'Get reminded about upcoming deadlines' },
                      { key: 'gradeUpdates', label: 'Grade Updates', desc: 'Get notified when grades are posted' },
                      { key: 'courseAnnouncements', label: 'Course Announcements', desc: 'Receive course-related announcements' },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'Get notified about system maintenance' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 glass-dark rounded-lg">
                        <div>
                          <h3 className="text-white font-medium">{setting.label}</h3>
                          <p className="text-gray-400 text-sm">{setting.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            id={`notification-${setting.key}`}
                            type="checkbox"
                            checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings, 
                              [setting.key]: e.target.checked
                            })}
                            className="sr-only peer"
                            title={`Toggle ${setting.label}`}
                            aria-label={`Toggle ${setting.label}`}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Appearance & Display</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-3">Theme</label>
                      <div className="space-y-2">
                        {['dark', 'light', 'auto'].map((theme) => (
                          <label key={theme} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="theme"
                              value={theme}
                              checked={appearanceSettings.theme === theme}
                              onChange={(e) => setAppearanceSettings({...appearanceSettings, theme: e.target.value})}
                              className="w-4 h-4 text-purple-500"
                            />
                            <span className="text-white capitalize">{theme}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fontSize" className="block text-gray-300 text-sm font-medium mb-3">Font Size</label>
                      <select
                        id="fontSize"
                        value={appearanceSettings.fontSize}
                        onChange={(e) => setAppearanceSettings({...appearanceSettings, fontSize: e.target.value})}
                        className="w-full px-4 py-3 glass rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        title="Select font size"
                        aria-label="Select font size"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Compact Mode</h3>
                        <p className="text-gray-400 text-sm">Use a more compact layout</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="compactMode"
                          type="checkbox"
                          checked={appearanceSettings.compactMode}
                          onChange={(e) => setAppearanceSettings({...appearanceSettings, compactMode: e.target.checked})}
                          className="sr-only peer"
                          title="Enable compact mode"
                          aria-label="Enable compact mode"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Smooth Animations</h3>
                        <p className="text-gray-400 text-sm">Enable smooth page transitions and animations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="smoothAnimations"
                          type="checkbox"
                          checked={appearanceSettings.animations}
                          onChange={(e) => setAppearanceSettings({...appearanceSettings, animations: e.target.checked})}
                          className="sr-only peer"
                          title="Enable smooth animations"
                          aria-label="Enable smooth animations"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-6">System & Data</h2>
                  
                  <div className="space-y-4">
                    <div className="glass-dark rounded-lg p-6">
                      <h3 className="text-white font-medium mb-2">Export Data</h3>
                      <p className="text-gray-400 text-sm mb-4">Download a copy of your account data</p>
                      <button className="btn-glow px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg flex items-center gap-2 hover:bg-blue-500/30">
                        <Download className="w-4 h-4" />
                        Download Data
                      </button>
                    </div>

                    <div className="glass-dark rounded-lg p-6">
                      <h3 className="text-white font-medium mb-2">Clear Cache</h3>
                      <p className="text-gray-400 text-sm mb-4">Clear stored data to free up space</p>
                      <button className="btn-glow px-4 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg">
                        Clear Cache
                      </button>
                    </div>

                    <div className="glass-dark rounded-lg p-6 border border-red-500/30">
                      <h3 className="text-red-400 font-medium mb-2">Delete Account</h3>
                      <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all associated data</p>
                      <button className="btn-glow px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
