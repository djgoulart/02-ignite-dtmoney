import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { Container } from './styles';


const TransactionsTable = () => {
  const {transactions} = useContext(TransactionsContext)
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
          {
            transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="title">{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                  .format(transaction.type === 'withdraw' ? (0 - transaction.value) : transaction.value)}
                </td>
                <td>{transaction.category}</td>
                <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
    </Container>
  );
}

export default TransactionsTable;