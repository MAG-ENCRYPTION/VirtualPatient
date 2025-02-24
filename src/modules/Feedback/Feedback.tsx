import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const FeedbackContainer = styled.div`
  background: #e1f5fe; /* Couleur de fond des messages envoyés */
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-self: flex-end; /* Aligner à droite pour les messages envoyés */
  max-width: 70%; /* Limiter la largeur */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Author = styled.span`
  font-weight: bold;
  color: #3f51b5; /* Couleur du texte de l'auteur */
`;

const FeedbackContent = styled.div`
  flex: 1; /* Permet au contenu de prendre l'espace restant */
  p {
    margin: 0; /* Supprimer la marge par défaut */
    padding: 0; /* Supprimer le padding par défaut */
    color: black; /* Couleur du texte */
  }
`;


const Feedback: React.FC<{ author: string; content: string }> = ({ author, content }) => {
  return (
    <FeedbackContainer>
      <FeedbackHeader>
        <Author>{author}</Author>
      </FeedbackHeader>
      <FeedbackContent>
        <p>&nbsp;{content}&nbsp;</p>
      </FeedbackContent>
    </FeedbackContainer>
  );
};

export default Feedback;
