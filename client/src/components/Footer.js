const Footer = () => {
  return (
    <div className="bg-gray-800 text-white">
      <footer className="p-6 ">
        <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium">Services</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <a rel="noopener noreferrer" href="#">
                Services
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium">Pricing</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <a rel="noopener noreferrer" href="#">
                Pricing
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium">Contact</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <a rel="noopener noreferrer" href="#">
                Contact
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium">Community</h2>
            <div className="flex flex-col space-y-2 text-sm ">
              <a rel="noopener noreferrer" href="#">
                GitHub
              </a>
              <a rel="noopener noreferrer" href="#">
                Discord
              </a>
              <a rel="noopener noreferrer" href="#">
                Twitter
              </a>
              <a rel="noopener noreferrer" href="#">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 pt-12 text-sm">
          <span className="">© Copyright 2023. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
