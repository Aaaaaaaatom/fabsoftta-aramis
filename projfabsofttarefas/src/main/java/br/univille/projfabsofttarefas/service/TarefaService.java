package br.univille.projfabsofttarefas.service;

import br.univille.projfabsofttarefas.entity.Tarefa;

import java.util.List;
import java.util.Optional;

public interface TarefaService {
    public List<Tarefa> findAll();
    public Optional<Tarefa> findById(Long id);
    public Tarefa save(Tarefa tarefa);
    public void deleteById(Long id);
}
