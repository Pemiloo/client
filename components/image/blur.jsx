import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ImageBlur = ({ scrollPosition, src, width =100, height = 100 ,className, wrapClassName}) => {
  return(
    <LazyLoadImage            
      scrollPosition = {scrollPosition}            
      src = {src}
      effect = "blur"
      width = {width}
      height = {height}
      threshold = {500}      
      className = {className}
      placeholderSrc = {"/pemilo.svg"}
      wrapperClassName = {wrapClassName}
    />    
  );
}

export default trackWindowScroll(ImageBlur);