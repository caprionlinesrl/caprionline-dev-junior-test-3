import React from "react";

interface LayoutProps {	
	children:any
}

const Layout:React.FC<LayoutProps> = props => {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				{props.children}
			</div>
		</section>
	);
};

export default Layout;