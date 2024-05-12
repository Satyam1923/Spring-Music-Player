import Carousel from 'react-bootstrap/Carousel';
function CarouselImage() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647"
          alt="Song"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i0.wp.com/philicpiano.com/wp-content/uploads/2022/05/Love-Me-Like-You-Do.jpg?fit=500%2C500&ssl=1"
          alt="Song"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="      https://images.genius.com/873e6480e39f372757df11f3ffb1e228.1000x1000x1.jpg"
          alt="Song"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://c.saavncdn.com/799/Soulmate-Hindi-2024-20240404153039-500x500.jpg"
          alt="Song"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselImage;