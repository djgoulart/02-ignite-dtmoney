import React from 'react';

import { Container } from './styles';

const TransactionsTable: React.FC = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="title">Desenvolvimento de site</td>
            <td className="income">R$12.000,00</td>
            <td>Desenvolvimento</td>
            <td>29/03/2021</td>
          </tr>
          <tr>
            <td className="title">Aluguel</td>
            <td className="outcome">- R$2.000,00</td>
            <td>Casa</td>
            <td>30/03/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default TransactionsTable;