import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste da aplicação toda', () => {
  it('Teste se a página contém um h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
