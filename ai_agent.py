#!/usr/bin/env python3
"""
ai_agent.py - Python Adaptive Reinforcement Learning & Trap Orchestrator for Devil's Trial
Implements online pattern recognition, player behavioral profiling, and progressive difficulty optimization.
Zero external dependencies (pure Python 3 standard library).
"""

import sys
import json
import math
import random
import os

MEMORY_FILE = os.path.join(os.path.dirname(__file__), 'ai_memory.json')

DEFAULT_WEIGHTS = {
    "RUSHER": [0.55, -0.35, 0.25, 0.60, -0.15],
    "CAUTIOUS": [-0.50, 0.65, -0.30, -0.50, 0.35],
    "HOPPER": [0.15, -0.15, 0.85, 0.20, -0.10],
    "CHAOTIC": [0.30, 0.25, 0.40, 0.10, 0.50],
    "METHODICAL": [-0.30, 0.35, -0.15, 0.40, -0.40]
}

DEFAULT_EFFICACY = {
    "collapsing_floor": 1.0,
    "piston_crusher": 1.0,
    "rolling_ball": 1.0,
    "hidden_spike": 1.0,
    "dropping_spike": 1.0,
    "spinning_saw": 1.0,
    "moving_platform": 1.0,
    "spring_pad": 1.0,
    "troll_portal": 1.0,
    "sliding_door": 1.0,
    "reversed_controls": 1.0,
    "falling_platform": 1.0,
    "coin_trap": 1.0
}

class DevilPythonAI:
    def __init__(self):
        self.weights = {k: list(v) for k, v in DEFAULT_WEIGHTS.items()}
        self.trap_efficacy = dict(DEFAULT_EFFICACY)
        self.learning_epochs = 0
        self.player_skill = 1.0  # 1.0 (Beginner) -> 3.0 (Master)
        self.creativity_level = 1.0
        self.learning_rate = 0.08
        self.death_history = []
        self.clear_history = []
        self.load_memory()

    def load_memory(self):
        if os.path.exists(MEMORY_FILE):
            try:
                with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if 'weights' in data:
                        self.weights = data['weights']
                    if 'trap_efficacy' in data:
                        self.trap_efficacy = data['trap_efficacy']
                    if 'learning_epochs' in data:
                        self.learning_epochs = data['learning_epochs']
                    if 'player_skill' in data:
                        self.player_skill = data['player_skill']
                    if 'creativity_level' in data:
                        self.creativity_level = data['creativity_level']
            except Exception:
                pass

    def save_memory(self):
        try:
            data = {
                'weights': self.weights,
                'trap_efficacy': self.trap_efficacy,
                'learning_epochs': self.learning_epochs,
                'player_skill': self.player_skill,
                'creativity_level': self.creativity_level,
                'total_deaths_recorded': len(self.death_history)
            }
            with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
        except Exception:
            pass

    def extract_features(self, telemetry):
        total_frames = max(1, telemetry.get('totalFrames', 60))
        moving_frames = telemetry.get('movingFrames', 0)
        idle_frames = telemetry.get('idleFrames', 0)
        jump_count = telemetry.get('jumpCount', 0)
        rush_dist = telemetry.get('rushDistance', 0)
        duration_sec = max(1.0, total_frames / 60.0)

        moving_ratio = moving_frames / total_frames
        idle_ratio = idle_frames / total_frames
        rush_rate = rush_dist / total_frames
        jumps_per_sec = jump_count / duration_sec
        death_count = len(telemetry.get('deaths', []))

        # Normalized feature vector:
        # [0]: rush score (-1.0 to 1.0)
        # [1]: hesitation score (-1.0 to 1.0)
        # [2]: jump frequency (-1.0 to 1.0)
        # [3]: reckless speed (-1.0 to 1.0)
        # [4]: instability / panic rate (-1.0 to 1.0)
        f0 = min(1.0, max(-1.0, rush_rate * 2.2 - 1.0))
        f1 = min(1.0, max(-1.0, idle_ratio * 2.2 - 1.0))
        f2 = min(1.0, max(-1.0, jumps_per_sec * 1.4 - 0.6))
        f3 = min(1.0, max(-1.0, (moving_ratio - 0.5) * 2.0))
        f4 = min(1.0, max(-1.0, (death_count / max(1.0, duration_sec / 30.0)) - 0.5))

        return [f0, f1, f2, f3, f4]

    def classify(self, telemetry):
        features = self.extract_features(telemetry)
        scores = {}
        for profile, w in self.weights.items():
            dot = sum(features[i] * w[i] for i in range(len(features)))
            scores[profile] = dot

        # Softmax probabilities
        exp_scores = {p: math.exp(min(15.0, max(-15.0, s))) for p, s in scores.items()}
        sum_exp = sum(exp_scores.values()) or 1.0
        probs = {p: exp_scores[p] / sum_exp for p in exp_scores}

        best_profile = max(probs.keys(), key=lambda p: probs[p])
        confidence = int(round(probs[best_profile] * 100))

        # Action probabilities for micro-decisions
        p_jump = min(0.95, max(0.05, 0.25 + features[2] * 0.45 + (0.2 if best_profile == "HOPPER" else 0.0)))
        p_rush = min(0.95, max(0.05, 0.35 + features[0] * 0.40 + (0.25 if best_profile == "RUSHER" else 0.0)))
        p_hesitate = min(0.95, max(0.05, 0.20 + features[1] * 0.50 + (0.3 if best_profile == "CAUTIOUS" else 0.0)))

        strategy_map = {
            "RUSHER": "Deploying early sinkholes, sudden crushers & boulder checkpoints into forward stride",
            "CAUTIOUS": "Deploying trailing boulders & rhythmic crushers to punish hesitation and force errors",
            "HOPPER": "Deploying airborne sawblades & dropping stalactites calibrated to apex jump arc",
            "CHAOTIC": "Deploying deceptive troll portals, fake spring pads & runaway exit doors",
            "METHODICAL": "Deploying synchronized multi-stage trap combos and shifting floor deception"
        }

        return {
            "profile": best_profile,
            "confidence": confidence,
            "probabilities": probs,
            "actionLikelihoods": {
                "jump": round(p_jump, 2),
                "rush": round(p_rush, 2),
                "hesitate": round(p_hesitate, 2)
            },
            "strategy": strategy_map.get(best_profile, "Adaptive hybrid hazard optimization")
        }

    def learn_death(self, event):
        fatal_trap = event.get('trapType') or event.get('reason')
        level_id = event.get('levelId', 1)

        if fatal_trap and fatal_trap in self.trap_efficacy:
            self.trap_efficacy[fatal_trap] = min(4.0, self.trap_efficacy[fatal_trap] + 0.30)

        # Perceptron online gradient update
        if fatal_trap in ('collapsing_floor', 'piston_crusher'):
            self.weights['RUSHER'][0] += self.learning_rate * 0.4
            self.weights['RUSHER'][3] += self.learning_rate * 0.4
        elif fatal_trap == 'rolling_ball':
            self.weights['CAUTIOUS'][1] += self.learning_rate * 0.45
        elif fatal_trap in ('dropping_spike', 'spinning_saw'):
            self.weights['HOPPER'][2] += self.learning_rate * 0.5

        self.learning_epochs += 1
        self.death_history.append(event)
        self.save_memory()

        return {
            "status": "learned",
            "epochs": self.learning_epochs,
            "trapEfficacy": self.trap_efficacy
        }

    def learn_clear(self, event):
        level_id = event.get('levelId', 1)
        bypassed_traps = event.get('deployedTraps', [])

        for t in bypassed_traps:
            if t in self.trap_efficacy:
                self.trap_efficacy[t] = max(0.45, self.trap_efficacy[t] * 0.90)

        self.player_skill = min(3.2, self.player_skill + 0.15)
        self.creativity_level = min(2.8, 1.0 + (level_id * 0.12) + (self.player_skill * 0.20))
        self.learning_epochs += 1
        self.clear_history.append(event)
        self.save_memory()

        return {
            "status": "adapted",
            "epochs": self.learning_epochs,
            "playerSkill": round(self.player_skill, 2),
            "creativity": round(self.creativity_level, 2)
        }

    def synthesize_generative_traps(self, level_data, level_id=1, telemetry=None):
        """
        Dynamically craft bespoke traps directly from level geometry and player telemetry.
        Transforms surrounding blocks into living hazards and builds targeted defense perimeters.
        """
        if not level_data:
            return []

        def get_surface_at(lvl, x, preferred_y=None):
            if not lvl:
                return {'floorY': 345, 'ceilY': 220, 'headroom': 125}
            corridors = [c for c in lvl.get('pathwayCorridors', []) if c.get('x', 0) - 2 <= x <= c.get('x', 0) + c.get('w', 0) + 2]
            if corridors:
                best = corridors[0]
                if len(corridors) > 1 and preferred_y is not None:
                    best = min(corridors, key=lambda c: abs(c.get('y', 0) + c.get('h', 0) / 2 - preferred_y))
                ceil_y = best.get('y', 220)
                floor_y = ceil_y + best.get('h', 125)
                solids = lvl.get('solids', [])
                floor_solids = [s for s in solids if s.get('x', 0) - 1 <= x <= s.get('x', 0) + s.get('w', 0) + 1 and s.get('y', 0) >= ceil_y and abs(s.get('y', 0) - floor_y) <= 35]
                if floor_solids:
                    floor_solids.sort(key=lambda s: s.get('y', 0))
                    floor_y = floor_solids[0].get('y', 0)
                return {'floorY': floor_y, 'ceilY': ceil_y, 'headroom': floor_y - ceil_y}
            return {'floorY': 345, 'ceilY': 220, 'headroom': 125}

        synth_traps = []
        spawn = level_data.get('spawn', {'x': 80, 'y': 345})
        door = level_data.get('door', {'x': 750, 'y': 340, 'w': 34, 'h': 46})
        bounds = {'width': level_data.get('width', 900), 'height': level_data.get('height', 500)}
        solids = level_data.get('solids', [])
        corridors = level_data.get('pathwayCorridors', [])
        static_traps = level_data.get('staticTraps', [])

        classification = self.classify(telemetry or {})
        profile = classification.get('profile', 'RUSHER')

        # Progressive Difficulty Multiplier
        if level_id <= 1:
            diff_mult = 1.0
        elif level_id == 2:
            diff_mult = 1.15
        elif level_id == 3:
            diff_mult = 1.35
        elif level_id == 4:
            diff_mult = 1.55
        else:
            diff_mult = round(1.55 + math.log2(max(1, level_id - 3)) * 0.65, 2)

        def is_safe_distance(x, y, w=32, min_gap=25):
            start = x
            end = x + w
            for t in static_traps:
                ty = t.get('y', t.get('groundY', 340))
                if abs(ty - y) > 70:
                    continue
                t_start = t.get('x', 0)
                t_end = t_start + t.get('w', 32)
                gap = min_gap + 10 if t.get('type') == 'static_spike' else min_gap
                if not (end <= t_start - gap or start >= t_end + gap):
                    return False

            for s in synth_traps:
                sy = s.get('y', s.get('groundY', 340))
                if abs(sy - y) > 70:
                    continue
                s_start = s.get('x', 0)
                s_end = s_start + s.get('w', 32)
                if not (end <= s_start - min_gap or start >= s_end + min_gap):
                    return False

            # Protect spawn safe zone
            sp_x = spawn.get('x', 80)
            sp_y = spawn.get('y', 345)
            if (sp_y - 35 <= y <= sp_y + 35) and (sp_x - 40 <= x <= sp_x + 55):
                return False

            return True

        def add_synth_trap(trap):
            trap['isAIGenerated'] = True
            trap['aiLean'] = profile
            synth_traps.append(trap)

        # 1. DOOR DEFENSE PERIMETER — Authentic Level Devil hazards around door approach
        door_x = door.get('x', 750)
        door_floor_y = door.get('y', 340) + door.get('h', 46)
        sp_x = spawn.get('x', 80)
        sp_y = spawn.get('y', 345)

        door_pre_step_x = max(95, door_x - 70) if door_x > sp_x else min(bounds['width'] - 95, door_x + 70)

        # A1: Door Step Threshold Trap: Vanishing floor right before the door!
        surf_pre = get_surface_at(level_data, door_pre_step_x, door_floor_y)
        if is_safe_distance(door_pre_step_x, surf_pre['floorY'], 48, 20):
            add_synth_trap({
                'type': 'collapsing_floor',
                'x': door_pre_step_x,
                'y': surf_pre['floorY'],
                'w': 48,
                'h': 35,
                'dropSpeed': round(2.4 + diff_mult * 0.15, 2),
                'zone': 'exit',
                'purpose': 'door_sinkhole'
            })

        # A2: Door Ceiling Ambush (Dropping spike above door approach)
        door_ambush_x = max(95, door_x - 110) if door_x > sp_x else min(bounds['width'] - 95, door_x + 110)
        surf_ambush = get_surface_at(level_data, door_ambush_x, door_floor_y)
        if is_safe_distance(door_ambush_x, surf_ambush['ceilY'], 22, 25):
            add_synth_trap({
                'type': 'dropping_spike',
                'x': door_ambush_x,
                'y': surf_ambush['ceilY'],
                'w': 22,
                'h': 22,
                'groundY': surf_ambush['floorY'],
                'triggerRange': 55,
                'zone': 'exit',
                'purpose': 'door_anti_air'
            })

        # A3: Inverted Controls Sigil on Approach (Levels 6+)
        door_invert_x = max(95, door_x - 140) if door_x > sp_x else min(bounds['width'] - 95, door_x + 140)
        surf_invert = get_surface_at(level_data, door_invert_x, door_floor_y)
        if level_id >= 6 and is_safe_distance(door_invert_x, surf_invert['floorY'] - 30, 50, 25):
            add_synth_trap({
                'type': 'reversed_controls',
                'x': door_invert_x,
                'y': surf_invert['floorY'] - 30,
                'w': 50,
                'h': 30,
                'zone': 'exit',
                'purpose': 'door_inverted_approach'
            })
        elif level_id >= 8 and is_safe_distance(door_invert_x, surf_invert['floorY'], 45, 30):
            # A4: Troll Loop Portal (Levels 8+)
            add_synth_trap({
                'type': 'troll_portal',
                'x': door_invert_x,
                'y': surf_invert['floorY'],
                'w': 45,
                'h': 65,
                'exitX': max(160, sp_x + 140),
                'exitY': sp_y - 20,
                'exitVy': 2.5,
                'zone': 'exit',
                'purpose': 'door_loop_portal'
            })

        # 2. ARCHITECTURAL LEVEL DEVIL HAZARDS — Natural traps built into level geography
        for corr in corridors:
            c_w = corr.get('w', 0)
            c_h = corr.get('h', 0)
            c_x = corr.get('x', 0)
            c_y = corr.get('y', 0)
            if c_w >= 120 and (c_x > sp_x + 40) and (c_x + c_w < door_x + 40):
                mid_x = int(round(c_x + c_w * 0.5))
                surf_mid = get_surface_at(level_data, mid_x, c_y + c_h / 2)

                # Dropping stalactite from open ceiling
                if 95 <= mid_x <= bounds['width'] - 95 and is_safe_distance(mid_x, surf_mid['ceilY'], 22, 25):
                    add_synth_trap({
                        'type': 'dropping_spike',
                        'x': mid_x,
                        'y': surf_mid['ceilY'],
                        'w': 22,
                        'h': 22,
                        'groundY': surf_mid['floorY'],
                        'triggerRange': 48,
                        'zone': 'mid',
                        'purpose': 'arch_dropping_spike'
                    })

                # Falling stepping platform or bait coin in corridor
                plat_x = int(round(c_x + c_w * 0.25))
                surf_plat = get_surface_at(level_data, plat_x, c_y + c_h / 2)
                if 95 <= plat_x <= bounds['width'] - 95 and is_safe_distance(plat_x, surf_plat['floorY'], 55, 20):
                    add_synth_trap({
                        'type': 'falling_platform',
                        'x': plat_x,
                        'y': surf_plat['floorY'],
                        'w': 55,
                        'h': 14,
                        'dropSpeed': 2.2,
                        'zone': 'mid',
                        'purpose': 'arch_falling_platform'
                    })
                elif 95 <= plat_x + 30 <= bounds['width'] - 95 and is_safe_distance(plat_x + 30, surf_plat['floorY'] - 35, 20, 20):
                    add_synth_trap({
                        'type': 'coin_trap',
                        'x': plat_x + 30,
                        'y': surf_plat['floorY'] - 35,
                        'r': 8,
                        'zone': 'mid',
                        'purpose': 'arch_bait_coin'
                    })

        # 3. TELEMETRY COUNTER-LEAN TRAPS
        if profile == "RUSHER":
            rush_x = max(95, min(bounds['width'] - 95, sp_x + int(round((door_x - sp_x) * 0.4))))
            surf_rush = get_surface_at(level_data, rush_x, sp_y)
            if is_safe_distance(rush_x, surf_rush['floorY'], 26, 25):
                add_synth_trap({
                    'type': 'hidden_spike',
                    'x': rush_x,
                    'y': surf_rush['floorY'],
                    'w': 26,
                    'h': 16,
                    'triggerRange': 38,
                    'zone': 'mid',
                    'purpose': 'rush_counter_spike'
                })
            boulder_x = max(95, min(bounds['width'] - 95, door_x - 60 if door_x > sp_x else door_x + 60))
            surf_boulder = get_surface_at(level_data, boulder_x, door_floor_y)
            if is_safe_distance(boulder_x, surf_boulder['floorY'], 34, 30):
                add_synth_trap({
                    'type': 'rolling_ball',
                    'x': boulder_x,
                    'y': surf_boulder['floorY'],
                    'groundY': surf_boulder['floorY'],
                    'radius': 17,
                    'vx': round((-4.6 if door_x > sp_x else 4.6) - diff_mult * 0.35, 2),
                    'triggerRange': 95,
                    'zone': 'mid',
                    'purpose': 'rush_counter_boulder'
                })
        elif profile == "HOPPER":
            jump_apex_x = max(95, min(bounds['width'] - 95, sp_x + int(round((door_x - sp_x) * 0.35))))
            surf_apex = get_surface_at(level_data, jump_apex_x, sp_y)
            if is_safe_distance(jump_apex_x, surf_apex['ceilY'], 22, 25):
                add_synth_trap({
                    'type': 'dropping_spike',
                    'x': jump_apex_x,
                    'y': surf_apex['ceilY'],
                    'w': 22,
                    'h': 22,
                    'groundY': surf_apex['floorY'],
                    'triggerRange': 48,
                    'zone': 'mid',
                    'purpose': 'hopper_anti_air'
                })
            landing_x = max(95, min(bounds['width'] - 95, jump_apex_x + 55))
            surf_landing = get_surface_at(level_data, landing_x, sp_y)
            if is_safe_distance(landing_x, surf_landing['floorY'], 26, 25):
                add_synth_trap({
                    'type': 'hidden_spike',
                    'x': landing_x,
                    'y': surf_landing['floorY'],
                    'w': 26,
                    'h': 16,
                    'triggerRange': 32,
                    'zone': 'mid',
                    'purpose': 'hopper_landing_spike'
                })
        elif profile in ("CAUTIOUS", "METHODICAL"):
            chaser_x = (sp_x - 55) if sp_x >= 150 else (sp_x + 85)
            surf_chaser = get_surface_at(level_data, chaser_x, sp_y)
            chaser_vx = round((3.8 + diff_mult * 0.25) if sp_x >= 150 else (-3.8 - diff_mult * 0.25), 2)
            if is_safe_distance(chaser_x, surf_chaser['floorY'], 34, 30):
                add_synth_trap({
                    'type': 'rolling_ball',
                    'x': chaser_x,
                    'y': surf_chaser['floorY'],
                    'groundY': surf_chaser['floorY'],
                    'radius': 16,
                    'vx': chaser_vx,
                    'triggerRange': 75,
                    'zone': 'entry',
                    'purpose': 'camper_flusher_boulder'
                })
        else: # CHAOTIC
            spring_x = max(95, min(bounds['width'] - 95, sp_x + int(round((door_x - sp_x) * 0.5))))
            surf_spring = get_surface_at(level_data, spring_x, sp_y)
            if is_safe_distance(spring_x, surf_spring['floorY'], 32, 20):
                add_synth_trap({
                    'type': 'spring_pad',
                    'x': spring_x,
                    'y': surf_spring['floorY'],
                    'w': 32,
                    'h': 10,
                    'boostVy': -9.2,
                    'zone': 'mid',
                    'purpose': 'chaotic_spring_launch'
                })

        # 4. PAST-DEATH COUNTER REINFORCEMENT
        deaths = (telemetry or {}).get('deaths', [])
        if deaths:
            last_death = deaths[-1]
            ld_x = last_death.get('x')
            if ld_x is not None:
                counter_x = max(95, min(bounds['width'] - 95, int(round(ld_x + 45))))
                surf_death = get_surface_at(level_data, counter_x)
                if is_safe_distance(counter_x, surf_death['ceilY'], 22, 25):
                    add_synth_trap({
                        'type': 'dropping_spike',
                        'x': counter_x,
                        'y': surf_death['ceilY'],
                        'w': 22,
                        'h': 22,
                        'groundY': surf_death['floorY'],
                        'triggerRange': 45,
                        'zone': 'mid',
                        'purpose': 'death_counter_trap'
                    })

        return synth_traps

    def select_adaptive_traps(self, candidate_slots, static_traps, level_id, telemetry, level_data=None):
        if candidate_slots is None:
            candidate_slots = []

        # If level_data is provided and candidate_slots has no AI-synthesized traps yet, synthesize them
        if level_data and not any(s.get('isAIGenerated') for s in candidate_slots):
            synth = self.synthesize_generative_traps(level_data, level_id, telemetry)
            if synth:
                candidate_slots = list(candidate_slots) + synth

        if not candidate_slots:
            return {
                "selectedTraps": [],
                "difficultyMultiplier": 1.0,
                "maxTraps": 2,
                "classification": self.classify(telemetry or {})
            }

        classification = self.classify(telemetry or {})
        profile = classification['profile']
        bounds = level_data.get('bounds', {'width': 950}) if level_data else {'width': 950}

        # Progressive Difficulty Multiplier D(L) — unbounded logarithmic growth
        if level_id <= 1:
            diff_mult = 1.0
        elif level_id == 2:
            diff_mult = 1.15
        elif level_id == 3:
            diff_mult = 1.35
        elif level_id == 4:
            diff_mult = 1.55
        else:
            diff_mult = round(1.55 + math.log2(max(1, level_id - 3)) * 0.65, 2)

        # Dense Progressive Trap Budget: scales up to empower AI across the entire level architecture
        if level_id <= 2:
            max_traps = 2
        elif level_id <= 4:
            max_traps = 3
        else:
            lvl_w = bounds.get('width', 950)
            length_bonus = (lvl_w - 800) // 110
            max_traps = max(7, min(15, 6 + int((level_id - 4) * 0.75) + length_bonus))

        active_traps = list(static_traps or [])

        # Group candidate slots by comboId
        combo_groups = {}
        solo_slots = []
        for idx, raw_slot in enumerate(candidate_slots):
            slot = json.loads(json.dumps(raw_slot))
            cid = slot.get('comboId')
            if cid:
                if cid not in combo_groups:
                    combo_groups[cid] = []
                combo_groups[cid].append({'slot': slot, 'idx': idx})
            else:
                solo_slots.append({'slot': slot, 'idx': idx})

        def score_slot(slot):
            t_type = slot.get('type')
            affinity = 1.0
            efficacy = self.trap_efficacy.get(t_type, 1.0)

            if profile == "RUSHER":
                if t_type in ('reversed_controls', 'collapsing_floor'):
                    affinity += 2.4
                elif t_type in ('rolling_ball', 'piston_crusher'):
                    affinity += 1.8
                elif t_type in ('spinning_saw', 'hidden_spike'):
                    affinity += 1.4
            elif profile == "CAUTIOUS":
                if t_type in ('falling_platform', 'rolling_ball'):
                    affinity += 2.4
                elif t_type in ('coin_trap', 'piston_crusher'):
                    affinity += 1.8
                elif t_type in ('hidden_spike',):
                    affinity += 1.4
            elif profile == "HOPPER":
                if t_type in ('dropping_spike', 'falling_platform'):
                    affinity += 2.5
                elif t_type == 'spinning_saw':
                    affinity += 1.8
                elif t_type == 'hidden_spike':
                    affinity += 1.4
            elif profile == "CHAOTIC":
                if t_type in ('troll_portal', 'reversed_controls'):
                    affinity += 2.4
                elif t_type in ('sliding_door', 'spring_pad'):
                    affinity += 2.0
            elif profile == "METHODICAL":
                if t_type in ('reversed_controls', 'collapsing_floor'):
                    affinity += 2.2
                elif t_type in ('falling_platform', 'coin_trap'):
                    affinity += 1.8

            zone = slot.get('zone', 'mid')
            if zone == 'entry':
                affinity *= 1.1
            elif zone == 'exit':
                affinity *= 1.15

            if slot.get('comboId'):
                affinity *= 1.3
            if slot.get('gimmickBonus'):
                affinity *= 1.35

            return (affinity * efficacy) * (0.80 + random.random() * 0.40)

        selected = []
        used_indices = set()

        # Phase 1: Try to select combo groups first (atomic units)
        combo_items = []
        for cid, members in combo_groups.items():
            avg_score = sum(score_slot(m['slot']) for m in members) / len(members)
            combo_items.append({'cid': cid, 'members': members, 'score': avg_score})
        combo_items.sort(key=lambda c: c['score'], reverse=True)

        for combo in combo_items:
            if len(selected) + len(combo['members']) > max_traps:
                continue
            if all(self.is_safe(m['slot'], active_traps) for m in combo['members']):
                for m in combo['members']:
                    selected.append(m['slot'])
                    active_traps.append(m['slot'])
                    used_indices.add(m['idx'])

        # Phase 2: ML-predicted selection for remaining solo slots
        scored_solos = [{'slot': item['slot'], 'idx': item['idx'], 'score': score_slot(item['slot'])} for item in solo_slots]
        scored_solos.sort(key=lambda s: s['score'], reverse=True)

        remaining_budget = max_traps - len(selected)
        ml_budget = max(1, int(round(remaining_budget * 0.6)))
        for item in scored_solos:
            if len(selected) >= max_traps - int(remaining_budget * 0.4) or len(selected) >= max_traps:
                break
            if item['idx'] in used_indices:
                continue
            if self.is_safe(item['slot'], active_traps):
                selected.append(item['slot'])
                active_traps.append(item['slot'])
                used_indices.add(item['idx'])

        # Phase 3: Stochastic Wildcard surprise selection
        remaining_wildcards = [s for s in solo_slots if s['idx'] not in used_indices]
        random.shuffle(remaining_wildcards)
        for item in remaining_wildcards:
            if len(selected) >= max_traps:
                break
            if self.is_safe(item['slot'], active_traps):
                selected.append(item['slot'])
                active_traps.append(item['slot'])
                used_indices.add(item['idx'])

        # Fine-tune selected traps with progressive parameters
        speed_scale = min(1.8, 1.0 + (diff_mult - 1.0) * 0.25)
        tuned = []
        for trap in selected:
            t = json.loads(json.dumps(trap))
            if 'pauseDuration' in t:
                t['pauseDuration'] = max(20, int(round(t['pauseDuration'] / speed_scale)))
            if 'triggerRange' in t:
                jitter = random.randint(-4, 4)
                t['triggerRange'] = max(25, int(round(t['triggerRange'] * min(1.5, speed_scale))) + jitter)
            if 'vx' in t:
                t['vx'] = round(t['vx'] * min(1.6, speed_scale), 2)
            if 'speed' in t:
                t['speed'] = min(5.5, round(t['speed'] * speed_scale, 2))
            if 'dropSpeed' in t:
                t['dropSpeed'] = min(4.5, round(t['dropSpeed'] * speed_scale, 2))
            if 'riseSpeed' in t:
                t['riseSpeed'] = min(4.0, round(t['riseSpeed'] * speed_scale, 2))
            if 'punchSpeed' in t:
                t['punchSpeed'] = min(4.5, round(t['punchSpeed'] * speed_scale, 2))

            tuned.append(t)

        return {
            "selectedTraps": tuned,
            "difficultyMultiplier": round(diff_mult, 2),
            "maxTraps": max_traps,
            "classification": classification
        }

    def is_safe(self, slot, active_list):
        """Semantic Anti-Checkmate Mutual Exclusion Filter."""
        if not slot or not active_list:
            return True

        s_x = slot.get('x', 0)
        # Never allow traps to spawn inside left perimeter wall or outside playable bounds
        if s_x < 85:
            return False

        s_type = slot.get('type')
        s_y = slot.get('groundY', slot.get('y', 345))
        s_w = slot.get('w', 32)

        for act in active_list:
            if slot.get('comboId') and act.get('comboId') and slot['comboId'] == act['comboId']:
                continue
            a_type = act.get('type')
            a_y = act.get('groundY', act.get('y', 345))
            a_x = act.get('x', 0)
            a_w = act.get('w', 28)

            same_elevation = abs(s_y - a_y) < 65

            # Never dual boulders on same corridor
            if s_type == 'rolling_ball' and a_type == 'rolling_ball' and same_elevation:
                return False

            # Boulder + sawblade clearance
            if ((s_type == 'rolling_ball' and a_type in ('spinning_saw', 'razor')) or
                (a_type == 'rolling_ball' and s_type in ('spinning_saw', 'razor'))) and same_elevation:
                if abs(s_x - a_x) < 80:
                    return False

            # Minimum physical gap between traps on the same elevation
            if same_elevation:
                gap = (s_x - (a_x + a_w)) if s_x >= a_x else (a_x - (s_x + s_w))
                min_gap = 25 if (s_type == 'static_spike' or a_type == 'static_spike') else 16
                if gap < min_gap:
                    return False

        return True


def run_cli():
    ai = DevilPythonAI()

    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == '--test':
            sample_telemetry = {
                'totalFrames': 360,
                'movingFrames': 300,
                'idleFrames': 60,
                'jumpCount': 12,
                'rushDistance': 1100,
                'deaths': [{'reason': 'hazard', 'trapType': 'piston_crusher'}]
            }
            sample_candidates = [
                {'type': 'collapsing_floor', 'x': 250, 'y': 345, 'w': 48, 'h': 35, 'zone': 'entry'},
                {'type': 'piston_crusher', 'x': 340, 'startY': 200, 'targetY': 240, 'w': 40, 'h': 105, 'zone': 'mid'},
                {'type': 'rolling_ball', 'x': 600, 'y': 345, 'groundY': 345, 'radius': 16, 'vx': -4.5, 'zone': 'mid'},
                {'type': 'dropping_spike', 'x': 450, 'y': 220, 'w': 22, 'h': 22, 'groundY': 345, 'zone': 'mid'},
                {'type': 'spinning_saw', 'x': 520, 'y': 315, 'radius': 15, 'patrolAxis': 'x', 'minX': 480, 'maxX': 560, 'speed': 2.0, 'zone': 'exit'}
            ]
            result = ai.select_adaptive_traps(sample_candidates, [], 6, sample_telemetry)
            print(json.dumps(result, indent=2))
            return

        if cmd == '--predict':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.select_adaptive_traps(
                payload.get('candidateSlots', []),
                payload.get('staticTraps', []),
                payload.get('levelId', 1),
                payload.get('telemetry', {}),
                payload.get('levelData') or payload.get('levelGeometry')
            )
            print(json.dumps(res))
            return

        if cmd == '--synthesize':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.synthesize_generative_traps(
                payload.get('levelData') or payload.get('levelGeometry') or {},
                payload.get('levelId', 1),
                payload.get('telemetry', {})
            )
            print(json.dumps(res))
            return

        if cmd == '--learn-death':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.learn_death(payload)
            print(json.dumps(res))
            return

        if cmd == '--learn-clear':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.learn_clear(payload)
            print(json.dumps(res))
            return

        if cmd == '--classify':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.classify(payload)
            print(json.dumps(res))
            return

    # Default: read JSON from stdin
    try:
        raw = sys.stdin.read().strip()
        if raw:
            req = json.loads(raw)
            action = req.get('action', 'predict')
            if action == 'predict':
                res = ai.select_adaptive_traps(
                    req.get('candidateSlots', []),
                    req.get('staticTraps', []),
                    req.get('levelId', 1),
                    req.get('telemetry', {}),
                    req.get('levelData') or req.get('levelGeometry')
                )
                print(json.dumps(res))
            elif action == 'synthesize':
                res = ai.synthesize_generative_traps(
                    req.get('levelData') or req.get('levelGeometry') or {},
                    req.get('levelId', 1),
                    req.get('telemetry', {})
                )
                print(json.dumps(res))
            elif action == 'learn-death':
                print(json.dumps(ai.learn_death(req.get('event', {}))))
            elif action == 'learn-clear':
                print(json.dumps(ai.learn_clear(req.get('event', {}))))
            elif action == 'classify':
                print(json.dumps(ai.classify(req.get('telemetry', {}))))
            else:
                print(json.dumps({'error': 'Unknown action'}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == '__main__':
    run_cli()
