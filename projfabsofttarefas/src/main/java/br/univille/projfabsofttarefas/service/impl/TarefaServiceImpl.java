package br.univille.projfabsofttarefas.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.projfabsofttarefas.entity.Tarefa;
import br.univille.projfabsofttarefas.repository.TarefaRepository;
import br.univille.projfabsofttarefas.service.TarefaService;

@Service
public class TarefaServiceImpl implements TarefaService {
    @Autowired
    private TarefaRepository tarefaRepository;

    public List<Tarefa> findAll() {
        return tarefaRepository.findAll();
    }

    public Optional<Tarefa> findById(Long id) {
        return tarefaRepository.findById(id);
    }

    public Tarefa save(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public void deleteById(Long id) {
        tarefaRepository.deleteById(id);
    }
}
