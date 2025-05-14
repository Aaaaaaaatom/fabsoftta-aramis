package br.univille.projfabsofttarefas.service;

import br.univille.projfabsofttarefas.entity.Tarefa;
import br.univille.projfabsofttarefas.repository.TarefaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface TarefaService {


    public List<Tarefa> findAll() ;
    public Optional<Tarefa> findById(Long id) ;
    public Tarefa save(Tarefa tarefa) ;
    public void deleteById(Long id);
}
