import { useActiveSection } from '../../hooks/use-active-section.ts'

import Settings from './sections/settings.tsx'
import Help from './sections/help.tsx'
import FingridDashboard from './sections/fingrid.tsx'

export default function Dashboard() {
  const { activeSection } = useActiveSection()

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <FingridDashboard />
      case 'settings': return <Settings />
      case 'help': return <Help />
      default: return <FingridDashboard />
    }
  }

  return <div className="p-6">{renderSection()}</div>
}