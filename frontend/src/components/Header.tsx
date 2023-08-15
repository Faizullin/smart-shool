import { ReactNode, useState, useRef, useEffect } from "react";


type IHeaderProps = {
    children: ReactNode
  }

export default function Header({children}: IHeaderProps ){
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const headerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (elTopOffset: any, elHeight: any) => {
        if (window.pageYOffset > (elTopOffset + elHeight)) {
          setSticky({ isSticky: true, offset: elHeight });
        } else {
          setSticky({ isSticky: false, offset: 0 });
        }
    }

    useEffect(() => {
        if(headerRef.current) {
            var header = headerRef.current.getBoundingClientRect();
            const handleScrollEvent = () => {
                handleScroll(header.top, header.height)
            }
        
            window.addEventListener('scroll', handleScrollEvent);
        
            return () => {
                window.removeEventListener('scroll', handleScrollEvent);
            };
        }
      }, []);
    
    return (
        <header id="header" ref={headerRef} className={`header flex items-center ${sticky.isSticky? "sticked" : ""}`}>
            { children }
        </header>
    );
}