import s from "./style.module.css";


const Layout = ({ title, descr, urlBg, colorBg, children }) => {
	const styleBackground = urlBg ? (colorBg ? { backgroundColor: `${colorBg}`, backgroundImage: `url(${urlBg})` } : { backgroundImage: `url(${urlBg})` }) : (colorBg ? { backgroundColor: `${colorBg}` } : {});

	return (
		<section className={s.root} style={ styleBackground }>
			<div className={s.wrapper}>
				<article>
					<div className={s.title}>
						<h3>{title}</h3>
						<span className={s.separator}></span>
					</div>
					<div className={`${s.desc} ${s.full}`}>
						{children}
					</div>
				</article>
			</div>
		</section>
	);
};

export default Layout;