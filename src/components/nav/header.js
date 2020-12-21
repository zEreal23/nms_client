import React,{useState} from 'react'
import { Menu } from 'antd';
import { HomeOutlined , 
         SettingOutlined , 
         UserOutlined , 
         TeamOutlined , 
         TableOutlined , 
         EditOutlined ,
         LogoutOutlined
        } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const { SubMenu , Item , ItemGroup} = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')
    let dispatch = useDispatch()
    const {user} = useSelector((state) => ({...state}));

    let history = useHistory()

    const handleClick = (e) => {
        console.log(e.key)
        setCurrent(e.key)
    }

    const logout = () =>{
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            
           {!user && (
            <Item key="Login" icon={<UserOutlined />} className="float-right">
                <Link to="/login" path>Login</Link>
            </Item>
           )}
            
            {user &&(
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
                <ItemGroup title="Manage">
                    <Item key="Table" icon={<EditOutlined />}> <Link to="/table" path>Table</Link></Item>
                    <Item key="Category" icon={<TableOutlined />}><Link to="/category" path>Category</Link></Item>
                    <Item key="Menu" icon={<TableOutlined />}><Link to="/menu" path>Menu</Link></Item>  
                    <Item key="Staff" icon={<TeamOutlined />}><Link to="/staff" path>Staff</Link></Item>
                </ItemGroup> 

                <ItemGroup title="User">
                <Item key="Logout" icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
                </ItemGroup>
            </SubMenu> 
            )}     

            <Item key="home" icon={<HomeOutlined />} className="float-right">
                <Link to="/home" path>Home</Link>
            </Item> 
        </Menu>
    )
}

export default Header
