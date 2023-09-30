import style from './Layout.module.css';

const Layout = (props) => {
    return ( 
        <div className={style.main}>{props.children}</div>
     );
}
 
export default Layout;