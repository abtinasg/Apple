import HealthWidget from '@/components/dashboard/widgets/HealthWidget'
import BudgetWidget from '@/components/dashboard/widgets/BudgetWidget'
import DietWidget from '@/components/dashboard/widgets/DietWidget'
import TasksWidget from '@/components/dashboard/widgets/TasksWidget'
import CalendarWidget from '@/components/dashboard/widgets/CalendarWidget'
import HabitsWidget from '@/components/dashboard/widgets/HabitsWidget'
import MailWidget from '@/components/dashboard/widgets/MailWidget'
import WeatherWidget from '@/components/dashboard/widgets/WeatherWidget'
import NotesWidget from '@/components/dashboard/widgets/NotesWidget'
import MusicWidget from '@/components/dashboard/widgets/MusicWidget'

const widgets = [
  HealthWidget,
  BudgetWidget,
  DietWidget,
  TasksWidget,
  CalendarWidget,
  HabitsWidget,
  MailWidget,
  WeatherWidget,
  NotesWidget,
  MusicWidget,
]

export default function DashboardPage() {
  return (
    <div className="mt-5 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
      {widgets.map((Widget, i) => (
        <div
          key={i}
          className="mb-4 break-inside-avoid animate-fade-slide-up"
          style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
        >
          <Widget />
        </div>
      ))}
    </div>
  )
}
