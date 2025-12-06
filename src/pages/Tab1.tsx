import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonListHeader, 
  IonItem, 
  IonLabel,
  IonThumbnail,
  IonImg
} from '@ionic/react';
import React, {useState, useEffect} from 'react';
import './Tab1.css';

const extractImageSrc = (htmlString: string) => {
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const imgElement = tempDiv.querySelector('img');
    return imgElement ? imgElement.getAttribute('src') : null;
  } catch (e) {
    console.error("Error parsing image HTML:", e);
    return null;
  }
};

const Tab1: React.FC = () => {

  const [dataset, setDataset] = useState<any[]>([]);

  const dataURL = "https://dev-cs5513-fall2025-ashsouza.pantheonsite.io/wp-json/twentytwentyone-child/v1/mediumparrots";

  useEffect(() => {
    fetch(dataURL) 
    .then(response => response.json()) 
    .then(data => setDataset(data)) 
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-title">Medium Parrots</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="extra-large-title">Medium Parrot Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonList id="product-list">
          <IonListHeader></IonListHeader>
          
          {dataset.map((item, index) => {
            const imgSrc = extractImageSrc(item.description);
            return (
              <IonItem lines="none" key={index} className="product-item"> 
                {imgSrc && (
                  <IonThumbnail slot="start">
                    <IonImg src={imgSrc} alt={item.post_title} />
                  </IonThumbnail>
                )}
                
                <IonLabel className="product-label" slot="end"> 
                  <h2>{item.post_title}</h2>
                  <p className="date-time">{new Date(item.post_date).toLocaleDateString()}</p>
                  <h3>Price:{item.price}</h3>
                  <p>SKU:{item.sku}</p>
                </IonLabel>
              </IonItem>
            );
          })}
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;