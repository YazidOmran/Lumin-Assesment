﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerBackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagerBackend.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/tasks - Retrieve all tasks (requires view:tasks permission)
        [HttpGet]
        [Authorize("view:tasks")]
        public async Task<ActionResult<IEnumerable<TaskManagerBackend.Models.Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // POST: api/tasks - Add a new task (requires create:tasks permission)
        [HttpPost]
        [Authorize("create:tasks")]
        public async Task<ActionResult<TaskManagerBackend.Models.Task>> AddTask(TaskManagerBackend.Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Created("", task); // Return 201 Created without a specific location
        }

        // PUT: api/tasks/{id} - Update an existing task by ID (requires edit:tasks permission)
        [HttpPut("{id}")]
        [Authorize("edit:tasks")]
        public async Task<IActionResult> UpdateTask(int id, TaskManagerBackend.Models.Task updatedTask)
        {
            if (id != updatedTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tasks.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/tasks/{id} - Delete a task by ID (requires delete:tasks permission)
        [HttpDelete("{id}")]
        [Authorize("delete:tasks")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
