import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CourseFilters {
  category?: string;
  level?: string;
  isFree?: boolean;
}

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async getCourses(filters: CourseFilters) {
    const where: any = { isActive: true };

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.level) {
      where.level = filters.level;
    }

    if (filters.isFree !== undefined) {
      where.isFree = filters.isFree;
    }

    const courses = await this.prisma.course.findMany({
      where,
      include: {
        modules: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses;
  }

  async getCourse(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async enrollInCourse(courseId: string, userId: string) {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (!course.isActive) {
      throw new BadRequestException('Course is not available');
    }

    // Check if already enrolled
    const existingEnrollment = await this.prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('Already enrolled in this course');
    }

    // Create enrollment
    const enrollment = await this.prisma.courseEnrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: true,
      },
    });

    return enrollment;
  }

  async getUserCourses(userId: string) {
    const enrollments = await this.prisma.courseEnrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            modules: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    return enrollments;
  }

  async getModuleContent(courseId: string, moduleId: string, userId: string) {
    // Verify user is enrolled
    const enrollment = await this.prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new BadRequestException('You must be enrolled in this course to access content');
    }

    const module = await this.prisma.courseModule.findFirst({
      where: {
        id: moduleId,
        courseId,
      },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    return module;
  }

  async updateProgress(
    progressData: {
      courseId: string;
      moduleId?: string;
      completed: boolean;
      score?: number;
      timeSpent: number;
    },
    userId: string,
  ) {
    // Verify enrollment
    const enrollment = await this.prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: progressData.courseId,
        },
      },
    });

    if (!enrollment) {
      throw new BadRequestException('You must be enrolled in this course');
    }

    // Update or create progress record
    const progress = await this.prisma.educationProgress.upsert({
      where: {
        userId_courseId_moduleId: {
          userId,
          courseId: progressData.courseId,
          moduleId: progressData.moduleId || '',
        },
      },
      update: {
        completed: progressData.completed,
        score: progressData.score,
        timeSpent: {
          increment: progressData.timeSpent,
        },
        completedAt: progressData.completed ? new Date() : null,
      },
      create: {
        userId,
        courseId: progressData.courseId,
        moduleId: progressData.moduleId,
        completed: progressData.completed,
        score: progressData.score,
        timeSpent: progressData.timeSpent,
        completedAt: progressData.completed ? new Date() : null,
      },
    });

    // Update overall course progress
    if (progressData.completed) {
      await this.updateCourseProgress(userId, progressData.courseId);
    }

    return progress;
  }

  private async updateCourseProgress(userId: string, courseId: string) {
    // Get total modules in course
    const totalModules = await this.prisma.courseModule.count({
      where: { courseId },
    });

    // Get completed modules
    const completedModules = await this.prisma.educationProgress.count({
      where: {
        userId,
        courseId,
        completed: true,
      },
    });

    const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    // Update enrollment progress
    await this.prisma.courseEnrollment.update({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      data: {
        progress: progressPercentage,
        status: progressPercentage === 100 ? 'COMPLETED' : 'IN_PROGRESS',
        completedAt: progressPercentage === 100 ? new Date() : null,
      },
    });
  }

  async getRecoResources(category?: string) {
    const where: any = { isActive: true };
    
    if (category) {
      where.category = category;
    }

    const resources = await this.prisma.recoResource.findMany({
      where,
      orderBy: [
        { isOfficial: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return resources;
  }

  async getSelfRepresentationGuides(category?: string) {
    const where: any = { isActive: true };
    
    if (category) {
      where.category = category;
    }

    const guides = await this.prisma.selfRepresentationGuide.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { step: 'asc' },
      ],
    });

    return guides;
  }

  async getLicensingRequirements() {
    // Return comprehensive RECO licensing information
    return {
      overview: 'To become a licensed real estate agent in Ontario, you must complete specific education requirements and pass examinations administered by RECO (Real Estate Council of Ontario).',
      requirements: [
        {
          title: 'Pre-Registration Course',
          description: 'Complete the Real Estate as a Professional Career course',
          duration: '120 hours',
          provider: 'RECO-approved education providers',
        },
        {
          title: 'Registration Course',
          description: 'Complete the Real Estate Registration Course',
          duration: '240 hours',
          provider: 'RECO-approved education providers',
        },
        {
          title: 'Examinations',
          description: 'Pass the RECO registration examination',
          format: 'Multiple choice and case study questions',
          passingGrade: '70%',
        },
        {
          title: 'Background Check',
          description: 'Complete criminal background check and fingerprinting',
          validity: '6 months',
        },
        {
          title: 'Insurance',
          description: 'Obtain errors and omissions insurance',
          minimum: '$1 million per occurrence',
        },
      ],
      costs: [
        { item: 'Pre-Registration Course', cost: '$500 - $800' },
        { item: 'Registration Course', cost: '$1,200 - $1,800' },
        { item: 'RECO Examination', cost: '$250' },
        { item: 'Registration Fee', cost: '$500' },
        { item: 'Background Check', cost: '$50' },
        { item: 'Insurance (Annual)', cost: '$200 - $500' },
      ],
      timeline: '6-12 months depending on course schedule and study pace',
    };
  }

  async getContinuingEducation() {
    return {
      overview: 'RECO requires all licensed agents to complete continuing education to maintain their license.',
      requirements: [
        {
          title: 'Annual Education Requirement',
          hours: 24,
          description: 'Must complete 24 hours of continuing education annually',
        },
        {
          title: 'Mandatory Topics',
          topics: [
            'Professional Ethics',
            'Real Estate Law Updates',
            'Consumer Protection',
          ],
          hours: 6,
        },
        {
          title: 'Elective Topics',
          description: 'Remaining hours can be in any real estate-related topics',
          hours: 18,
        },
      ],
      reporting: 'Education must be reported to RECO by December 31st annually',
      penalties: 'Failure to complete requirements may result in license suspension',
    };
  }

  async getUserProgressSummary(userId: string) {
    const enrollments = await this.prisma.courseEnrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            title: true,
            category: true,
            duration: true,
          },
        },
      },
    });

    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.status === 'COMPLETED').length;
    const inProgressCourses = enrollments.filter(e => e.status === 'IN_PROGRESS').length;

    const totalHoursCompleted = await this.prisma.educationProgress.aggregate({
      where: {
        userId,
        completed: true,
      },
      _sum: {
        timeSpent: true,
      },
    });

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalHoursSpent: Math.round((totalHoursCompleted._sum.timeSpent || 0) / 60),
      enrollments: enrollments.map(e => ({
        courseTitle: e.course.title,
        category: e.course.category,
        progress: e.progress,
        status: e.status,
        enrolledAt: e.enrolledAt,
        completedAt: e.completedAt,
      })),
    };
  }
}
