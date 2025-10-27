import TodoAppComponent from './components/TodoAppComponent'; 
import {getTasks} from './actions';
export default async function Home() {
  const initialTasks = await getTasks(); 
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center"> 
      <TodoAppComponent tasks={initialTasks} />
    </main>
  );
}