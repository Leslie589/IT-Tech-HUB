import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export const MasGaleria = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [cards, setCard] = useState([]);
  useEffect(() => {
    axios
      .post('/api/MasImagenes', { "id": props.id, "nombre": props.nombre })
      .then((res) => {
        setCard(res.data.Resuelto);

      })
  }, [])

  const openModal = (src, event, index) => {
    event.stopPropagation();
    setCurrentImageIndex(index);
    const modal = document.getElementById("modal01");
    const modalImg = document.getElementById("modal-img");

    modalImg.src = src;
    modal.style.display = "block";
  };

  const closeModal = () => {
    const modal = document.getElementById("modal01");
    modal.style.display = "none";
  };

  const goToPreviousImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex - 1 < 0 ? cards.length - 1 : prevIndex - 1;
      const modalImg = document.getElementById("modal-img");
      modalImg.src = cards[newIndex].Imagen;
      return newIndex;
    });
  };

  const goToNextImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % cards.length;
      const modalImg = document.getElementById("modal-img");
      modalImg.src = cards[newIndex].Imagen;
      return newIndex;
    });
  };

  return (

    <div style={{ marginTop: -50 }}>
    <div className="container">
    <h4  className="display-3 fw-bold lh-1 ">Galería.</h4>
    <br/>
      <h4 className="display-6 fw-bold lh-1">{props.nombre + ' : ' + props.proev}</h4>
      <br />
      <div className="row " style={{ marginTop: "30px" }}>
        {cards.map((x, index) =>
          <div key={index} className="col-sm-4 my-4">
            <div className="card w-70 "   >
              <img src={x.Imagen} className="d-disabled w-100" height="300" alt=""  onClick={(event) => openModal(x.Imagen, event, index)}/>
              <br />
                <p className="text-center mt-2">
                  Clic en la imagen para visualizarla en detalle.
                </p>
            </div>

          </div>
        )}






      </div>
      </div>

      <div
        id="modal01"
        className="modal"
        style={{ paddingTop: 0, backgroundColor: "black" }}
        onClick={closeModal}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          {/* Ajusta el tamaño del modal */}
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div style={{ position: "relative" }}>
                <img
                  id="modal-img"
                  className="img-fluid"
                  alt=""
                  style={{ maxWidth: "100%", height: "auto" }}
                  src={cards[currentImageIndex]?.Imagen}
                />
                <div
                   style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-40%)",
                    cursor: "pointer",
                    
                    color: "#7DCE13",
                
                    fontSize: "66px", // Ajusta el tamaño del icono
                    padding: "1px", // Ajusta el espacio alrededor del icono
                  }}
                  
                  onClick={(event) => goToPreviousImage(event)}
                >
                  &lt;
                </div>
                <div style={{  position: "absolute",top: "50%", transform: "translateY(-40%)",cursor: "pointer", color: "#7DCE13", fontSize: "66px", // Ajusta el tamaño del icono
                    padding: "1px", // Ajusta el espacio alrededor del ic
                   
                    right: 0,
                   
                  }}
                  onClick={(event) => goToNextImage(event)}
                >
                  &gt;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};