import { Card, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import scales from 'static/scales'
function Home() {
  return (
      <div>
        <h1 className="text-[2.23rem]">欢迎使用break up!</h1>
        <h2 className="my-[20px] text-[1.5rem]">请选择问题集</h2>
        <List>
          {scales.map((s, i) => (
            <ListItem key={i}>
              <Card className="w-[100%]">
                <Link
                  to="/scale"
                  state={{ form: s.body }}
                  className="block p-[12px] no-underline text-black"
                >
                  <ListItemText
                    primary={s.name}
                    secondary={s.introduction}
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

export default Home
