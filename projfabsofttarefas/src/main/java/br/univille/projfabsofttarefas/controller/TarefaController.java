package br.univille.projfabsofttarefas.controller;

import br.univille.projfabsofttarefas.entity.Tarefa;
import br.univille.projfabsofttarefas.service.TarefaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @GetMapping
    public List<Tarefa> getAllTarefas() {
        return tarefaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> getTarefaById(@PathVariable Long id) {
        Optional<Tarefa> tarefa = tarefaService.findById(id);
        if (tarefa.isPresent()) {
            return ResponseEntity.ok(tarefa.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Tarefa createTarefa(@RequestBody Tarefa tarefa) {
        return tarefaService.save(tarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> updateTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaDetails) {
        Optional<Tarefa> tarefaOptional = tarefaService.findById(id);
        if (!tarefaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Tarefa tarefa = tarefaOptional.get();
        tarefa.setTitulo(tarefaDetails.getTitulo());
        tarefa.setDescricao(tarefaDetails.getDescricao());
        tarefa.setDataTermino(tarefaDetails.getDataTermino());
        tarefa.setConcluida(tarefaDetails.isConcluida());
        Tarefa updatedTarefa = tarefaService.save(tarefa);
        return ResponseEntity.ok(updatedTarefa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarefa(@PathVariable Long id) {
        tarefaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nao-concluidas")
    public List<Tarefa> getTarefasNaoConcluidas() {
        return tarefaService.findAll().stream()
                .filter(t -> !t.isConcluida())
                .collect(Collectors.toList());
    }

    @GetMapping("/atrasadas")
    public List<Tarefa> getTarefasAtrasadas() {
        LocalDate hoje = LocalDate.now();
        return tarefaService.findAll().stream()
                .filter(t -> !t.isConcluida() && t.getDataTermino() != null && t.getDataTermino().isBefore(hoje))
                .collect(Collectors.toList());
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Tarefa> getTarefasByUsuario(@PathVariable Long usuarioId) {
        return tarefaService.findAll().stream()
                .filter(t -> t.getUsuario() != null && t.getUsuario().getId() == usuarioId)
                .collect(Collectors.toList());
    }

    @GetMapping("/usuario/{usuarioId}/nao-concluidas")
    public List<Tarefa> getTarefasNaoConcluidasByUsuario(@PathVariable Long usuarioId) {
        return tarefaService.findAll().stream()
                .filter(t -> t.getUsuario() != null && t.getUsuario().getId() == usuarioId && !t.isConcluida())
                .collect(Collectors.toList());
    }

    @GetMapping("/usuario/{usuarioId}/concluidas")
    public List<Tarefa> getTarefasConcluidasByUsuario(@PathVariable Long usuarioId) {
        return tarefaService.findAll().stream()
                .filter(t -> t.getUsuario() != null && t.getUsuario().getId() == usuarioId && t.isConcluida())
                .collect(Collectors.toList());
    }

    @GetMapping("/usuario/{usuarioId}/atrasadas")
    public List<Tarefa> getTarefasAtrasadasByUsuario(@PathVariable Long usuarioId) {
        LocalDate hoje = LocalDate.now();
        return tarefaService.findAll().stream()
                .filter(t -> t.getUsuario() != null && t.getUsuario().getId() == usuarioId && 
                           !t.isConcluida() && t.getDataTermino() != null && t.getDataTermino().isBefore(hoje))
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/concluir")
    public ResponseEntity<Tarefa> marcarComoConcluida(@PathVariable Long id) {
        Optional<Tarefa> tarefaOptional = tarefaService.findById(id);
        if (!tarefaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Tarefa tarefa = tarefaOptional.get();
        tarefa.setConcluida(true);
        Tarefa updatedTarefa = tarefaService.save(tarefa);
        return ResponseEntity.ok(updatedTarefa);
    }

    @PutMapping("/{id}/desmarcar")
    public ResponseEntity<Tarefa> desmarcarComoConcluida(@PathVariable Long id) {
        Optional<Tarefa> tarefaOptional = tarefaService.findById(id);
        if (!tarefaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Tarefa tarefa = tarefaOptional.get();
        tarefa.setConcluida(false);
        Tarefa updatedTarefa = tarefaService.save(tarefa);
        return ResponseEntity.ok(updatedTarefa);
    }
}
