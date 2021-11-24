import Link from 'next/link';

const Layout = ({ children }) =>{
    return (
        <div>
        <div>
            <Link href ="/"><a>Home</a></Link>
            <Link href ="/calender"><a>Calender</a></Link>
            <Link href ="/profile"><a>profile</a></Link>
            <Link href ="/sign"><a>sign</a></Link>
        </div>
        
            {children}
        </div>
    )
}


export default Layout;