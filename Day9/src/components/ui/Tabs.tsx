import { useState, ReactNode, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Tabs({ defaultValue, children, className, orientation = 'horizontal' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", orientation === 'vertical' && "flex gap-6", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("flex p-1 bg-white/10 dark:bg-white/5 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-600/20", className)}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive
          ? "text-white dark:text-white"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        className
      )}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg"
          layoutId="activeTab"
          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabs();
  
  if (activeTab !== value) return null;

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("mt-4", className)}
    >
      {children}
    </motion.div>
  );
}

// Pre-built Tab Components for common use cases
interface QuickTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    content: ReactNode;
    icon?: ReactNode;
    badge?: string | number;
  }>;
  defaultValue?: string;
  className?: string;
}

export function QuickTabs({ tabs, defaultValue, className }: QuickTabsProps) {
  const firstTab = tabs[0]?.value || '';
  
  return (
    <Tabs defaultValue={defaultValue || firstTab} className={className}>
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {tab.badge}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="space-y-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
