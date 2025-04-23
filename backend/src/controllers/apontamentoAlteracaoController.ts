import { Request, Response } from 'express';

class ApontamentoAlteracao {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      // Lógica para buscar dados do Mongo
      return res.status(200).json({ message: 'GET route funcionando' });
    } catch (error: any) {
      return res.status(500).json({ err: error.message });
    }
  }

  public async receiveFilter(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate, latitude, longitude } = req.body;

      console.log('Dados recebidos do front-end:');
      console.log({ startDate, endDate, latitude, longitude });

      return res.status(200).json({ message: 'Dados recebidos com sucesso!' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ApontamentoAlteracao();