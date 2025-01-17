import React from "react";

function Footer() {
  return (
	<footer>
		<div className="footer-container mt-6 p-3 items-c text-gray-400 max-md:gap-3 flex max-md:flex-col justify-between">
			<div className="about text-center w-1/4 max-md:w-full">
				<ul>
					<li>
						<a href="#">About Us</a>
					</li>
					<li>
						<p>This website is for Fullstack basic Training. A user connect and see other user data based on his permessions...</p>
					</li>
				</ul>
			</div>
			<div className="terms w-1/4 max-md:w-full">
				<ul className="text-center">
					<li>
						<a href="#" className="hover:text-yellow-500 hover:underline">Terms and Conditions</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-500 hover:underline">Privacy Policy</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-500 hover:underline">Support</a>
					</li>
				</ul>
			</div>
			<div className="contact text-center w-1/4 max-md:w-full">
				<ul>
					<li>
						<a href="#" className="hover:text-yellow-500 hover:underline"><i class="fa-brands fa-x-twitter"></i> Twitter</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-500 hover:underline"><i class="fa-brands fa-linkedin-in"></i> Linkedin</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-500 hover:underline"><i class="fa-solid fa-envelope"></i> Email</a>
					</li>
				</ul>
			</div>
		</div>
		<div className="copyright">
			<p className="text-center">© alalahyan 2025,  All Rights Reserved</p>
		</div>
	</footer>
  );
}
export default Footer;