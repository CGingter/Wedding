import sonni from '../assets/sonnikleid.jpg';

export default function Dresscode() {
    return (
        <div style={{ margin: '1em 0' }}>
            <h2>Dresscode</h2>
            <p>Zieht gerne alles außer Dunkelblau an.<br />
                Wenn ihr noch euer Hochzeitskleid/Anzug habt, zieht das auch gerne an.
                Ihr dürft sogar in weiß kommen, wenn ihr möchtet :)
            </p>
            <img
        src={sonni}
        alt="Brautpaar"
        className="headline-image"
      />
            </div>
    );
}
