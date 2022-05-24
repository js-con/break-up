import { Card, List, ListItem, ListItemText } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'
import questions from 'static/questions/test'
import Scale from './Scale'

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scale" element={<Scale />}></Route>
      </Routes>
    </div>
  )
}

function Home() {
  return (
      <div>
        <h1 className="text-[2.23rem]">欢迎使用break up!</h1>
        <h2 className="my-[20px] text-[1.5rem]">请选择问题集</h2>
        <List>
          {questions.map((q, i) => (
            <ListItem key={i}>
              <Card className="w-[100%]">
                <Link
                  to="/scale"
                  state={{ question: q.questions }}
                  className="block p-[12px] no-underline text-black"
                >
                  <ListItemText
                    primary={q.name}
                    secondary={q.introduction}
                    className="text-white"
                  />
                </Link>
              </Card>
            </ListItem>
          ))}
        </List>
      </div>
  )
}

export default App
