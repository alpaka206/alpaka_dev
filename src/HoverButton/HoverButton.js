import "./HoverButton.css";

const HoverButton = () => {
  return (
    <div className="button-container">
      <div className="button-element">
        <button className="hover-button color-change">색상 변화</button>
        <button className="hover-button border-change">테두리 변화</button>
        <button className="hover-button shadow-change">그림자 변화</button>
        <button className="hover-button scale-change">크기 변화</button>
        <button className="hover-button rotate-change">회전 변화</button>
        <button className="hover-button glow-effect">빛 효과</button>
      </div>
      <div className="button-element">
        <button className="hover-button opacity-change">투명도 변화</button>
        <button className="hover-button text-decoration">텍스트 장식</button>

        <button className="hover-button slide-effect">슬라이드 효과</button>
        <button className="hover-button ripple-effect">물결 효과</button>
        <div className="hover-button">
          <div className="hover-content">
            🏠
            <span className="tooltip-text">홈페이지</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverButton;
