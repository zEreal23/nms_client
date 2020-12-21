import React,{useState} from 'react'
import { Menu } from 'antd';
import { HomeOutlined , 
         SettingOutlined , 
         UserOutlined , 
         TeamOutlined , 
         TableOutlined , 
         EditOutlined 
        } from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { SubMenu , Item , ItemGroup} = Menu;

const Header = () => {
    const [current, setCurrent] = useState('')

    const handleClick = (e) => {
        console.log(e.key)
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/" path>Home</Link>
            </Item>

            <Item key="Login" icon={<UserOutlined />} >
            <Link to="/login" path>Login</Link>
            </Item>
            
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Setting" className="float-right">
                <ItemGroup title="Manage">
                    <Item key="Table" icon={<EditOutlined />}> <Link to="/table" path>Table</Link></Item>
                    <Item key="Category" icon={<TableOutlined />}><Link to="/category" path>Category</Link></Item>
                    <Item key="Menu" icon={<TableOutlined />}><Link to="/menu" path>Menu</Link></Item>  
                    <Item key="Staff" icon={<TeamOutlined />}><Link to="/staff" path>Staff</Link></Item>
                </ItemGroup> 
            </SubMenu>       
        </Menu>
    )
}

export default Header
