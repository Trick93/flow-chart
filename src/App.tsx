import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home'
import FlowChartDemo from './flow-chart-demo'

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'detail/:flowId',
    element: <FlowChartDemo />
  }
])

function App() {
  return <RouterProvider router={route} />
}

export default App
