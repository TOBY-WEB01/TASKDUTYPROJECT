import { useNavigate } from 'react-router'

export default function Logo() {
     const navigate = useNavigate()
  return (
      <div className="" >
       <img src="/Group 2 (1).png" alt="logo" className="w-60 md:w-100 mt-6"  onClick={() => navigate("/")}/>
    </div>
  )
}
