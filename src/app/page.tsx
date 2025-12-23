import Header from '@/components/Header/Header';
import Values from '@/components/Values/Values';
import NewsServer from '@/components/News/NewsServer';
import Form from '@/components/Form/Form';

export default function Home() {
  return (
    <>
      <Header />
      <Values />
      <NewsServer />
      <Form />
    </>
  );
}
