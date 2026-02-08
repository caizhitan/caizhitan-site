import img1 from '../../assets/img_1.jpg';
import img2 from '../../assets/img_2.jpg';
import img3 from '../../assets/img_3.jpg';
import img4 from '../../assets/img_4.jpg';
import img5 from '../../assets/img_5.jpg';

export default function LandingImages() {
    return (
        <div className="hero-images absolute top-1/2 -translate-y-1/2 w-full px-8 flex justify-center gap-[10vw] z-50">
            <div className="img w-[10vw] aspect-5/7 translate-y-1/2 scale-50 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] opacity-0">
                <img src={img1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="img w-[10vw] aspect-5/7 translate-y-1/2 scale-50 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] opacity-0">
                <img src={img2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="img hero-img w-[10vw] aspect-5/7 translate-y-1/2 scale-50 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] opacity-0">
                <img src={img3} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="img w-[10vw] aspect-5/7 translate-y-1/2 scale-50 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] opacity-0">
                <img src={img4} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="img w-[10vw] aspect-5/7 translate-y-1/2 scale-50 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] opacity-0">
                <img src={img5} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export const landingImageSrcs = [img1, img2, img3, img4, img5];
