import { store } from './store/store'
import { addTodo } from './store/slices/todoSlice'
import { addTeamMember } from './store/slices/teamSlice'

export const loadSampleData = () => {
  // Add sample todos
  const sampleTodos = [
    'Complete Redux Toolkit assignment',
    'Implement Team Management features',
    'Add proper TypeScript types',
    'Style the components with CSS',
    'Write comprehensive README'
  ]

  sampleTodos.forEach(todo => {
    store.dispatch(addTodo(todo))
  })

  // Add sample team members
  const sampleTeamMembers = [
    {
      name: 'Shubham Das',
      internType: 'Frontend Developer',
      workAssigned: 'Develop user interface components and implement responsive design'
    },
    {
      name: 'Majnu Bhai',
      internType: 'Backend Developer',
      workAssigned: 'Build REST APIs and database integration'
    },
    {
      name: 'Rajat Dalal',
      internType: 'Full Stack Developer',
      workAssigned: 'Work on both frontend and backend integration'
    },
    {
      name: 'Thara Bhai Joginder',
      internType: 'UI/UX Designer',
      workAssigned: 'Create wireframes and design user experience flows'
    },
    {
      name: 'Ritesh Sharma',
      internType: 'Data Analyst',
      workAssigned: 'Analyze user data and create performance reports'
    },
    {
      name: 'Akshay Nema',
      internType: 'DevOps Engineer',
      workAssigned: 'Setup CI/CD pipelines and server configurations'
    },
    {
      name: 'Yuvraj Yadav',
      internType: 'Frontend Developer',
      workAssigned: 'Develop Dashboard Components'
    },
    {
      name: 'Prateek Pandey',
      internType: 'Backend Developer',
      workAssigned: 'Develop Auth Process For the Website'
    },
    {
      name: 'Akshat Jain',
      internType: 'Mobile Developer',
      workAssigned: 'Develop mobile applications for Android and iOS'
    }
  ]

  sampleTeamMembers.forEach(member => {
    store.dispatch(addTeamMember(member))
  })

  console.log('Sample data loaded successfully!')
}
