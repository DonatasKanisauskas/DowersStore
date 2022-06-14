import React from 'react';
import Footer from "../Footer";
import Header from "../Header";
import '../../styles/Layout.sass';

function Layout(props: any) {
	return (
		<>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</>
	)
}

export default Layout;